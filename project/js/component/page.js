import {post} from "../utility/post.js"
import {get} from "../utility/get.js"
import {createAddInputButton, forEachFolder, sortBy, findBackgroundImage} from "../utility/tools.js"

/* --------------------------------------------- */
function loadPage(struct, pageLocation) {
	const user = struct.user;

    const content = document.getElementById("content");
    content.innerHTML = "";

    const cardWrapperDiv = document.createElement("div");
    cardWrapperDiv.classList.add("hero");
    cardWrapperDiv.id = "card-wrapper";

    const cardWrapperContainerDiv = document.createElement("div");
    cardWrapperContainerDiv.classList.add("container");

    content.appendChild(cardWrapperDiv);
    cardWrapperDiv.appendChild(cardWrapperContainerDiv);

    const pages = struct.children;
	pages.sort(sortBy.Unicode);
    forEachFolder(pages, (page) => {
        if (page.MimeType.includes("directory") && page.id === pageLocation ) {

        	const titles = page.children;
			titles.sort(sortBy.Unicode).reverse();
            forEachFolder(titles, (title) => {
            	/* add title */
                const titleDiv = createTitle(title);
                cardWrapperContainerDiv.appendChild(titleDiv);

                const subtitles = title.children;
				subtitles.sort(sortBy.Unicode).reverse();
                forEachFolder(subtitles, (subtitle) => {
                	/* add subtitle */
	                const { subtitleDiv, cardContainer } = createSubtitle(subtitle);
	                const cards = subtitle.children;
					cards.sort(sortBy.Unicode);
                    forEachFolder(cards, (card) => {
                    	/* add card */
                        const {cardImg} = createCard(card.name, `?subpage=${card.id}`, cardContainer);
                        setCardBackground(user, card, cardImg)
                    });
	                cardWrapperContainerDiv.appendChild(subtitleDiv);
	                cardWrapperContainerDiv.appendChild(cardContainer);

	                // cardAddButton(cardContainer, struct);
                });
            });
            // const TitleAddButton = createTitle();
            // cardWrapperContainerDiv.appendChild(TitleAddButton);

            // const SubTitleAddButton = createSubtitle();
            // cardWrapperContainerDiv.appendChild(SubTitleAddButton);
        }
    });
}

function setCardBackground(user, card, cardImg) {
    const backgroundImage = findBackgroundImage(card);


    if (backgroundImage) {
        get(user, backgroundImage.id).then((data) => {
            const blob = new Blob([new Uint8Array(data.bytes)], { type: data.MimeType });
            const url = URL.createObjectURL(blob);
            cardImg.src = url;
            cardImg.onload = function() {
                URL.revokeObjectURL(url);
            }
        });
    }
}


function createTitle(title) {
    const titleDiv = document.createElement('div');
    titleDiv.classList.add("text-container", "title");

    const titleA = document.createElement('a');
    titleA.draggable = false;
    titleDiv.appendChild(titleA);

    const titleH2 = document.createElement('h2');
    titleH2.classList.add("text");    
    titleA.appendChild(titleH2);

    if(title){
	    titleH2.classList.add("title-anchor-icon");
    	titleDiv.id = title.id;
	    titleA.href = "#" + title.id;
	    titleH2.textContent = title.name;
    }
    else{
    	const addIcon = document.createElement("div");
		addIcon.classList.add("adding-icon");
		titleA.appendChild(addIcon);
		titleH2.textContent = "add new title"
    }
    return titleDiv;
}

function createSubtitle(subtitle) {
    const subtitleDiv = document.createElement('div');
    const subtitleA = document.createElement('a');
    subtitleA.draggable = false;
    const subtitleH3 = document.createElement('h3');

    subtitleDiv.classList.add("text-container", "sub-title");
    subtitleH3.classList.add("text");

    subtitleDiv.appendChild(subtitleA);
    subtitleA.appendChild(subtitleH3);

    if(subtitle){
    	subtitleDiv.id = subtitle.id;
	    subtitleA.href = "#" + subtitle.id;
	    subtitleH3.textContent = subtitle.name;
	    subtitleH3.classList.add("sub-title-anchor-icon");
    }else{
    	const addIcon = document.createElement("div");
		addIcon.classList.add("adding-icon");
		subtitleA.appendChild(addIcon);
    	subtitleH3.textContent = "add new subtitle";
    	return subtitleDiv;
    }

    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container", "row");

    return { subtitleDiv, cardContainer };
}

function createCard(name, href, cardContainer) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add("col-lg-4", "col-md-6","col-sm-12");

    const cardA = document.createElement('a');
    cardA.draggable = false;
    cardA.classList.add("card");
    cardA.href = href;

    const cardImgDiv = document.createElement('div');
    cardImgDiv.classList.add("img-container");

    const cardCaptionH4 = document.createElement('h4');
    cardCaptionH4.classList.add("card-caption", "text");

    const cardImg = document.createElement('img');
    cardImg.classList.add("card-img");

    cardContainer.appendChild(cardDiv);
    cardDiv.appendChild(cardA);
    cardA.appendChild(cardImgDiv);
    cardA.appendChild(cardCaptionH4);
    cardImgDiv.appendChild(cardImg);

    if(name){
	    cardCaptionH4.textContent = name;
	    cardImg.src = "./img/default.png";
    }
    if(!name&&href=="#adding"){
    	const addIcon = document.createElement("div");
		addIcon.classList.add("adding-icon");
		cardA.appendChild(addIcon);
		return {cardDiv, cardA, cardImgDiv, cardCaptionH4, cardImg, addIcon}
    }

    return {cardImg}
}

function cardAddButton(cardContainer, struct){
	const {cardDiv, cardA, cardImgDiv, cardCaptionH4, cardImg, addIcon} = createCard(undefined, "#adding", cardContainer);
	/* --- */
	cardDiv.addEventListener("click", addFolder);
	function addFolder(e){
		const urlParams = new URLSearchParams(window.location.search);
		const page = urlParams.get("page");
		const subtitle = cardDiv.parentNode.previousSibling;

		/* --- */
		const addInput = createAddInputButton();
		cardCaptionH4.appendChild(addInput);
		addInput.focus();

		var inputChanged = false;
		addInput.addEventListener("keypress", checkInputChange);
		function checkInputChange(e){
			inputChanged = true;
			if(e.key=="Enter"){
				cardAddPost({"target":[]});
			}
		}
		
		window.addEventListener('click', cardAddPost);
		function cardAddPost(event){
			addIcon.style.display = "none";
			if(![cardDiv, cardA, cardImgDiv, cardCaptionH4, cardImg, addIcon, addInput].includes(event.target)){
				addInput.remove();
				if(inputChanged&&addInput.value!=""){
					const name = addInput.value;
					/* ---input content has been changed--- */
					// console.log("confirm add");
					cardAddButton(cardContainer, struct);
				    cardImg.src = "./img/default.png";
					cardCaptionH4.textContent = addInput.value;

					const body = {
						"name": name,
						"parent": {
							"id": subtitle.id,
							"name": subtitle.firstChild.textContent,
						}
					}
					post(struct.user, body);
				}else{
					/* ---input content has NOT been changed--- */
		    		// console.log("cancel add");
					addIcon.style.display = "block";
			        cardDiv.classList.remove("adding");
			        cardDiv.addEventListener("click", addFolder);
				}
				window.removeEventListener('click', cardAddPost);
			}
		}
		cardDiv.removeEventListener('click', addFolder);
	}
}

export {loadPage, createTitle, createSubtitle, createCard, cardAddButton};