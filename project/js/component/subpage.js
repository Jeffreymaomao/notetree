import {get} from "../utility/get.js"
import {visualize} from "../utility/visualize.js"
import {forEachFolder} from "../utility/tools.js"

 
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

						    content.appendChild(cardWrapperDiv);
						    cardWrapperDiv.appendChild(cardWrapperContainerDiv);

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
	            div.style.marginLeft = `${level * 10}px`; // 添加這一行來設置 margin-left
	            div.style.maxHeight = "700px";
	            div.style.overflow = "scroll";
	            div.style.border = "1px solid black";
	            container.appendChild(div);
	            if (!element.MimeType.includes("directory")) {
	                get(struct.user, element.id).then((file) => {
	                    const displayDiv = visualize(file);
	                    if (displayDiv) {
	                        div.appendChild(displayDiv);
	                    }
	                });
	            } else {
	                // 如果元素是資料夾，遞歸地調用 mainSubPage 函數來處理資料夾內的內容
	                mainSubPage(struct, element, container, level + 1);
	            }
	        }
	        const hr = document.createElement("hr");
	        container.append(hr);
	    });
	}
}


export {loadSubPage, mainSubPage};

