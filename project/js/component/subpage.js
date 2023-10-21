import {get} from "../utility/get.js"
import {visualize} from "../utility/visualize.js"

 
function loadSubPage(struct, subpageId){
	const content = document.getElementById("content");
	content.innerHTML = "";
	struct.children.forEach((page)=>{
		if(page.MimeType.includes("directory")){
			page.children.forEach((title)=>{
				title.children.forEach((subtitle)=>{
					subtitle.children.forEach((subpage)=>{
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
	subpage.children.forEach((element)=>{
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

