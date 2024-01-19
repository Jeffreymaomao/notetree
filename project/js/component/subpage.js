import {get} from "../utility/get.js";
import {visualize} from "../utility/visualize.js";
import {forEachFolder} from "../utility/tools.js"; 

// This Page is Note Page, but for convenient, I call it subsubpage.

function loadSubPage(struct, subpageId){
	const content = document.getElementById("content");
	content.innerHTML = "";
	forEachFolder(struct.children, (page)=>{
		if(page.MimeType.includes("directory")){
			forEachFolder(page.children, (title)=>{
				forEachFolder(title.children, (subtitle)=>{
					forEachFolder(subtitle.children, (subpage)=>{
						if(subpage.id==subpageId){
							/* ---------------------------------------- */
							const cardWrapperDiv = document.createElement("div");
						    cardWrapperDiv.classList.add("hero");
						    cardWrapperDiv.id = "card-wrapper";

						    const cardWrapperContainerDiv = document.createElement("div");
						    cardWrapperContainerDiv.classList.add("container");

						    const titleH1ContainerDiv = document.createElement("a");
						    const titleH1Div = document.createElement("h1");
						    titleH1ContainerDiv.draggable = false;
						    titleH1ContainerDiv.href = `#${subpage.id}`;
						    titleH1Div.innerText = subpage.name;
						    titleH1Div.classList.add("text");

						    content.appendChild(cardWrapperDiv);
						    cardWrapperDiv.appendChild(cardWrapperContainerDiv);
						    cardWrapperContainerDiv.appendChild(titleH1ContainerDiv);
						    titleH1ContainerDiv.appendChild(titleH1Div);

							mainSubPage(struct, subpage, cardWrapperContainerDiv);
							/* ---------------------------------------- */
						}
					})
				})
			})
		}
	})
}

function mainSubPage(struct, subpage, container, level = 0) {
	if(subpage.MimeType.includes("directory")){
		subpage.children.forEach((element) => {
	        var divDOM = document.getElementById(element.id);
	        if (!divDOM) {
	            const div = document.createElement("div");
	            div.id = element.id;
	            div.textContent = element.name;
	            div.style.marginLeft = `${level * 30}px`; // js add margin left
	            container.appendChild(div);

	            if (!element.MimeType.includes("directory")) {
	            	const boundFetchAndDisplayData = fetchAndDisplayData.bind(null, struct, div);
				    div.boundFetchAndDisplayData = boundFetchAndDisplayData;
	            	div.classList.add("file-container");
	            	div.addEventListener("click", boundFetchAndDisplayData);

	            	const newTabIconDOM = document.createElement("a");
	            	newTabIconDOM.classList.add("icon");
	            	newTabIconDOM.classList.add("new-tab-icon");
	            	newTabIconDOM.target = '_blank';
	            	newTabIconDOM.href = `?id=${element.id}`;
	            	div.appendChild(newTabIconDOM);
	            } else {
	                // if is element is directory recall this function itself
	                div.classList.add("folder-container");
	                mainSubPage(struct, element, container, level + 1);
	            }
	        }
	    });
	}
}



function fetchAndDisplayData(struct, parentNode, event) {
	parentNode.classList.add("waiting");
	parentNode.removeEventListener("click", parentNode.boundFetchAndDisplayData);

    get(struct.user, parentNode.id).then((file) => {
		parentNode.classList.remove("waiting");
        if (!file) {
            parentNode.classList.add("get-empty");
            return;
        }
        parentNode.classList.add("get");
        const displayDiv = visualize(file);
        if (displayDiv) {
            parentNode.appendChild(displayDiv);
            parentNode.addEventListener("click", (e) => {
                if (e.target===parentNode) displayDiv.classList.toggle("expand");
            });
        }
    }).catch((error) => {
        console.error(error);
    });
}


export {loadSubPage, mainSubPage};

