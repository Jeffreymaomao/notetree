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

function mainSubPage(struct, subpage, container){
	forEachFolder(subpage.children, (element)=>{
		var divDOM = document.getElementById(element.id);
		if(!divDOM){
			const div = document.createElement("div");
			div.id = element.id;
			div.textContent = element.name;
			container.appendChild(div);
			if(!element.MimeType.includes("directory")){
				get(struct.user, element.id).then((file) => {
					div.textContent = "";
					const displayDiv = visualize(file);
					if(displayDiv){
						div.appendChild(displayDiv);
					}
				})
			}
		}
		const hr = document.createElement("hr");
		container.append(hr);
	})
}

export {loadSubPage, mainSubPage};

