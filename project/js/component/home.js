import {post} from "../utility/post.js"
import {get} from "../utility/get.js"
import {createAddInputButton, forEachFolder, forEachImage, findBackgroundImage, sortBy} from "../utility/tools.js"

/* --------------------------------------------- */
function loadHome(struct){
	const user = struct.user;
	const content = document.getElementById("content");
	content.innerHTML = "";

	/* button list*/
	const linkWrapperDiv = document.createElement("div");
	const linkWrapperContainerDiv = document.createElement("div");
	const linkBtnContainerDiv = document.createElement("div");

	content.appendChild(linkWrapperDiv);
	linkWrapperDiv.appendChild(linkWrapperContainerDiv);
	linkWrapperContainerDiv.appendChild(linkBtnContainerDiv);

	linkWrapperDiv.classList.add("hero");
	linkWrapperDiv.id = "link-wrapper";
	linkWrapperContainerDiv.classList.add("container");
	linkBtnContainerDiv.classList.add("link-btn-container");

	const pages = struct.children;
	pages.sort(sortBy.custom);

	forEachFolder(pages, (page)=>{
		const {linkBtnImg} = createLinkButton(page.name, `?page=${page.id}`, linkBtnContainerDiv);
		setLinkButtonBackground(user, page, linkBtnImg);
	})

	// homeAddButton(linkBtnContainerDiv, struct);
}

function setLinkButtonBackground(user, page, linkBtnImg) {
    const backgroundImage = findBackgroundImage(page);

    if (backgroundImage) {
        get(user, backgroundImage.id).then((data) => {
            const blob = new Blob([new Uint8Array(data.bytes)], { type: data.MimeType });
            const url = URL.createObjectURL(blob);
            linkBtnImg.src = url;
            linkBtnImg.onload = function() {
                URL.revokeObjectURL(url);
            }
        });
    }
}

function createLinkButton(name, href, linkBtnContainerDiv) {
	const linkBtnA = document.createElement("a");
	const linkBtnImg = document.createElement("img");
	const linkTextContainerDiv = document.createElement("div");
	const linkTextH1 = document.createElement("h1");

	linkBtnA.classList.add("link-btn");
	linkBtnImg.classList.add("link-img");
	linkTextContainerDiv.classList.add("text-container");
	linkTextH1.classList.add("text");

	linkBtnImg.src = "img/default.png";

	linkBtnContainerDiv.appendChild(linkBtnA);
	linkBtnA.appendChild(linkBtnImg);
	linkBtnA.appendChild(linkTextContainerDiv);
	linkTextContainerDiv.appendChild(linkTextH1);

	linkBtnA.href = href;
	if(name){
		linkTextH1.textContent = name;
	}
	if(!name&&href=="#adding"){
		const addIcon = document.createElement("div")
		addIcon.classList.add("adding-icon");
		linkBtnA.appendChild(addIcon);
		return {linkBtnA, linkBtnImg, linkTextContainerDiv, linkTextH1, addIcon} // this is return for adding button
	}
	return {linkBtnImg} // this is return for create button 
}

function homeAddButton(buttonContainerDiv, struct){
	const {linkBtnA, linkBtnImg, linkTextContainerDiv, linkTextH1, addIcon} = createLinkButton(undefined, "#adding", buttonContainerDiv);

	/* --- */
	linkBtnA.addEventListener("click", addFolder);
	function addFolder(e){
		/* --- */
		const urlParams = new URLSearchParams(window.location.search);
		const page = urlParams.get("page");

		if(page==null||page==struct.id){
			/* --- */
			addIcon.style.display = "none";
			linkBtnA.classList.add("adding");

			/* --- */
			const addInput = createAddInputButton();
			linkTextH1.appendChild(addInput);
			addInput.focus();

			/* --- */
			var inputChanged = false;
			addInput.addEventListener("keypress", checkInputChange);
			function checkInputChange(e){
				inputChanged = true;
				if(e.key=="Enter"){
					homeAddPost({"target":[]});
				}
			}

			/* --- */
			window.addEventListener('click', homeAddPost);
			function homeAddPost(event) {
				/* if click outside the adding card => cancel adding */
			    if (![linkBtnA,linkBtnImg,linkTextContainerDiv,linkTextH1,addInput,addIcon].includes(event.target)) {
			    	linkBtnA.classList.remove("adding");
			    	addInput.remove();
			    	
			    	if(inputChanged&&addInput.value!=""){
			    		const name = addInput.value;
			    		/* ---input content has been changed--- */
						// console.log("confirm add");
						linkTextH1.textContent = name;
						addIcon.remove();
				        homeAddButton(buttonContainerDiv, struct);
				        /* --- */
				        const body = {
							"name": name,
							"parent": {
								"name": struct.name,
								"id": struct.id,
							}
						}
				        post(struct.user, body);
				        /* ---*/
			    	}else{
			    		/* ---input content has NOT been changed--- */
			    		// console.log("cancel add");
						addIcon.style.display = "block";
				        linkBtnA.classList.remove("adding");
				        linkBtnA.addEventListener("click", addFolder);
			    	}	
			        window.removeEventListener('click', homeAddPost);
			    }
			}
			linkBtnA.removeEventListener('click', addFolder)
		}
	};
}

export {loadHome, createLinkButton, homeAddButton, createAddInputButton};