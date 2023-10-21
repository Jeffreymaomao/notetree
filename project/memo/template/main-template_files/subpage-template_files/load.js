/**
 * if need to reverse the order
 * 
 * > Object.keys(json[pageName]).reverse().forEach()
 * 
 * > Object.keys(json[pageName][title]).reverse().forEach()
 * 
 * > Object.keys(json[pageName][title][subtitle]).reverse().forEach()
 * 
 * */

function createHomePage(json){
	const content = document.getElementById("content");

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
	

	Object.keys(json).forEach((page)=>{
		const linkBtnA = document.createElement("a");
		const linkTextContainerDiv = document.createElement("div");
		const linkTextH1 = document.createElement("h1");

		linkBtnA.classList.add("link-btn");
		linkTextContainerDiv.classList.add("text-container");
		linkTextH1.classList.add("text");

		linkBtnA.href = "#!";
		linkTextH1.textContent = page;

		linkBtnContainerDiv.appendChild(linkBtnA);
		linkBtnA.appendChild(linkTextContainerDiv);
		linkTextContainerDiv.appendChild(linkTextH1);
	})

	/* About */
	const aboutWrapperDiv = document.createElement("div");
	const aboutWrapperContainerDiv = document.createElement("div");
	const darkMask = document.createElement("div");
	const aboutContainerDiv = document.createElement("div");
	const aboutTitleH1 = document.createElement("h1");
	const aboutTextContainerDiv = document.createElement("div");
	const aboutTextDiv = document.createElement("div");



	content.appendChild(aboutWrapperDiv);
	aboutWrapperDiv.appendChild(darkMask);
	aboutWrapperDiv.appendChild(aboutWrapperContainerDiv);
	aboutWrapperContainerDiv.appendChild(aboutContainerDiv);
	aboutContainerDiv.appendChild(aboutTitleH1);
	aboutContainerDiv.appendChild(aboutTextContainerDiv);
	aboutTextContainerDiv.appendChild(aboutTextDiv);

	aboutWrapperDiv.classList.add("hero")
	darkMask.classList.add("mask-dark")
	aboutWrapperContainerDiv.classList.add("container");
	aboutContainerDiv.classList.add("about-container");
	aboutTitleH1.classList.add("text");
	aboutTextContainerDiv.classList.add("text-container");
	aboutTextDiv.classList.add("text");

	aboutWrapperDiv.id = "about-wrapper";
	aboutTitleH1.id = "about-title"
	aboutTitleH1.textContent = "About";
	aboutTextDiv.textContent = `
	Lorem ipsum dolor, sit amet consectetur, adipisicing elit. Quisquam alias molestias libero eos cumque labore culpa, expedita dolore deserunt adipisci ut temporibus omnis voluptatum molestiae, quia delectus optio architecto voluptatibus. Minus facilis voluptates ab possimus libero labore ex nemo rem commodi, distinctio nobis delectus eos, incidunt, cumque adipisci hic temporibus doloribus ad quae odit natus. Ipsam tempora labore ex suscipit! Magnam nihil similique at iste, odit, provident. Accusantium fugit corrupti velit doloribus nihil praesentium ea iure beatae, repellat inventore fuga assumenda cum voluptatem nostrum eos ut perferendis eveniet quas molestiae.
	`;
}

function createCard(json,pageName){
	const content = document.getElementById("content");

	const cardWrapperDiv = document.createElement("div");
	const cardWrapperContainerDiv = document.createElement("div");

	cardWrapperDiv.classList.add("hero");
	cardWrapperContainerDiv.classList.add("container");

	cardWrapperDiv.id = "card-wrapper";

	content.appendChild(cardWrapperDiv);
	cardWrapperDiv.appendChild(cardWrapperContainerDiv);

	Object.keys(json[pageName]).forEach((title)=>{
		/* -- start title  ---------------------------------------- */
		const titleDiv = document.createElement('div');
		const titleA = document.createElement('a');
		const titleH2 = document.createElement('h2');

		titleDiv.classList.add("text-container","title");
		titleH2.classList.add("text","title-anchor-icon")

		titleDiv.id = title;		/* Notice: need symbols -> underscore */
		titleA.href = "#"+title;	/* Notice: need symbols -> underscore */
		titleH2.textContent = title;

		cardWrapperContainerDiv.appendChild(titleDiv);
		titleDiv.appendChild(titleA);
		titleA.appendChild(titleH2);

		Object.keys(json[pageName][title]).forEach((subtitle)=>{
			/* -- start subtitle  --------------------------------- */
			const subtitleDiv = document.createElement('div');
			const subtitleA = document.createElement('a');
			const subtitleH3 = document.createElement('h3');
			const cardContainer = document.createElement('div');

			subtitleDiv.classList.add("text-container","sub-title");
			subtitleH3.classList.add("text","sub-title-anchor-icon")
			cardContainer.classList.add("card-container","row");

			subtitleDiv.id = title + subtitle; 		/* Notice: need symbols -> underscore */
			subtitleA.href = "#"+ title + subtitle; 	/* Notice: need symbols -> underscore */
			subtitleH3.textContent = subtitle;

			cardWrapperContainerDiv.appendChild(subtitleDiv);
			subtitleDiv.appendChild(subtitleA);
			subtitleA.appendChild(subtitleH3);
			cardWrapperContainerDiv.appendChild(cardContainer);

			json[pageName][title][subtitle].forEach((card)=>{
				/* -- start card -----------------------------------*/
				const cardDiv = document.createElement('div');
				const cardA = document.createElement('a');
				const cardImgDiv = document.createElement('div');
				const cardCaptionDiv = document.createElement('div');
				const cardImg = document.createElement('img');

				cardDiv.classList.add("col-lg-4","col-md-6");
				cardA.classList.add("card");
				cardImgDiv.classList.add("img-container");
				cardCaptionDiv.classList.add("card-caption");
				cardImg.classList.add("card-img");

				cardCaptionDiv.textContent = card["title"];

				if(card["image"]==""||card["image"]){
					cardImg.src = "../img/default.png"
				}else{
					cardImg.src = card["image"];
				}

				if(card["link"]==""||card["link"]){
					cardA.href = "#!"
				}else{
					cardA.href = card["link"];
				}

				cardContainer.appendChild(cardDiv);
				cardDiv.appendChild(cardA);
				cardA.appendChild(cardImgDiv);
				cardA.appendChild(cardCaptionDiv);
				cardImgDiv.appendChild(cardImg);


				/* -- end card -------------------------------------*/
			})
			/* -- end subtitle  ----------------------------------- */
		})
		/* -- end title  ------------------------------------------ */
	})
}
