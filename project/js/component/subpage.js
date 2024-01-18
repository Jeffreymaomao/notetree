import {get} from "../utility/get.js";
import {visualize} from "../utility/visualize.js";
import {forEachFolder} from "../utility/tools.js";
 
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
	            div.style.marginLeft = `${level * 30}px`; // 添加這一行來設置 margin-left
	            container.appendChild(div);

	            // const nameList = element.name.split(".").reverse();
	            // const fileExt = nameList.length === 1 ? null : nameList[0];
	            // console.log(fileExt);

	            if (!element.MimeType.includes("directory")) {
	            	div.classList.add("file-container");
	                get(struct.user, element.id).then((file) => {
	                	if(!file){
		                    div.classList.add("get-empty");
		                    return;
	                	}
	                    div.classList.add("get");
	                    const displayDiv = visualize(file);
	                    if(displayDiv) {
	                        div.appendChild(displayDiv);
	                        div.addEventListener("click",e=>{
	                        	if([...displayDiv.children].includes(e.target)) return;
	                        	displayDiv.classList.toggle("expand");
	                        });
	                    }
	                });
	            } else {
	                // 如果元素是資料夾，遞歸地調用 mainSubPage 函數來處理資料夾內的內容
	                div.classList.add("folder-container");
	                mainSubPage(struct, element, container, level + 1);
	            }
	        }
	    });
	}
}


export {loadSubPage, mainSubPage};

