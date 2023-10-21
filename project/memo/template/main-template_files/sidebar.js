function sideBarEventListener(button){
	button.addEventListener("click",(e)=>{
		e.preventDefault();
		button.querySelector(".icon").classList.toggle("expanded-icon");
		button.querySelector(".icon").classList.toggle("collapsed-icon");
		const menu = button.parentElement.nextElementSibling;
		
		if (menu.style.maxHeight) {
	    	menu.style.maxHeight = null;
	    } else {
	    	menu.style.maxHeight = menu.scrollHeight + "px";
	    } 
	})
}

function createSideBar(json, pageName){
	const primaryButtons = []; /* These Buttons will be return*/

	const sidebar = document.getElementById("sidebar");
	const sidebarContainerDiv = document.createElement("div");
	const sidebarListDiv = document.createElement("div");

	sidebarContainerDiv.classList.add("container");
	sidebarListDiv.classList.add("sidebar-primary-menu");

	sidebar.appendChild(sidebarContainerDiv);
	sidebarContainerDiv.appendChild(sidebarListDiv);

	/* Home */
	const primaryA = document.createElement('a');
	const primaryIconContainerDiv = document.createElement('div');
	const primaryIconDiv = document.createElement('div');
	const primaryTextContainerDiv = document.createElement('div');
	const primaryTextDiv = document.createElement('div');

	primaryA.classList.add("sidebar-primary-item");
	primaryIconContainerDiv.classList.add("icon-container");
	primaryTextContainerDiv.classList.add("text-container");
	primaryIconDiv.classList.add("icon","main-icon")
	primaryTextDiv.classList.add("text");

	if(pageName=="main"){primaryA.classList.add("active");}

	primaryTextDiv.textContent = "main";
	primaryA.href = "#";

	sidebarListDiv.appendChild(primaryA);
	primaryA.appendChild(primaryIconContainerDiv);
	primaryA.appendChild(primaryTextContainerDiv);
	primaryIconContainerDiv.appendChild(primaryIconDiv);
	primaryTextContainerDiv.appendChild(primaryTextDiv);

	/* append primary button DOM element*/
	primaryButtons.push(primaryA);
	
	Object.keys(json).forEach((page)=>{
		const primaryA = document.createElement('a');
		const primaryIconContainerDiv = document.createElement('div');
		const primaryIconDiv = document.createElement('div');
		const primaryTextContainerDiv = document.createElement('div');
		const primaryTextDiv = document.createElement('div');
		const primaryExpandContainerDiv = document.createElement('div');
		const primaryExpandDiv = document.createElement('div');
		const primaryList = document.createElement('ul');

		primaryA.classList.add("sidebar-primary-item");
		primaryIconContainerDiv.classList.add("icon-container");
		primaryTextContainerDiv.classList.add("text-container");
		primaryIconDiv.classList.add("icon", page+"-icon");
		primaryTextDiv.classList.add("text");
		primaryExpandContainerDiv.classList.add("btn-container");
		primaryExpandDiv.classList.add("icon","collapsed-icon");
		primaryList.classList.add("sidebar-secondary-menu");

		if(pageName === page){primaryA.classList.add("active");}

		primaryTextDiv.textContent = page;
		primaryA.href = "#";

		sidebarListDiv.appendChild(primaryA);
		sidebarListDiv.appendChild(primaryList);
		primaryA.appendChild(primaryIconContainerDiv);
		primaryA.appendChild(primaryTextContainerDiv);
		primaryA.appendChild(primaryExpandContainerDiv);
		primaryIconContainerDiv.appendChild(primaryIconDiv);
		primaryTextContainerDiv.appendChild(primaryTextDiv);
		primaryExpandContainerDiv.appendChild(primaryExpandDiv);


		/* Add Sidebar Buttons EventListener*/
		sideBarEventListener(primaryExpandContainerDiv);
		/* append primary button DOM element*/
		primaryButtons.push(primaryA);

		Object.keys(json[page]).forEach((title)=>{
			
			const secondaryItem = document.createElement('li');
			const secondaryA = document.createElement('a');
			const secondaryList = document.createElement('ul');

			secondaryItem.classList.add("sidebar-secondary-item");
			secondaryA.classList.add("text-container");
			secondaryList.classList.add("sidebar-tertiary-menu");
			
			secondaryA.textContent = title;
			secondaryA.href = "./" + page + ".html#" + title;

			primaryList.appendChild(secondaryItem);
			primaryList.appendChild(secondaryList);
			secondaryItem.appendChild(secondaryA);

			Object.keys(json[page][title]).forEach((subtitle)=>{
				const tertiaryItem = document.createElement('li');
				const tertiaryA = document.createElement('a');

				tertiaryItem.classList.add("sidebar-tertiary-item");
				tertiaryA.classList.add("text-container");
				
				tertiaryA.textContent = subtitle;
				tertiaryA.href = "#!";
				tertiaryA.href = "./" + page + ".html#" + title + subtitle;

				secondaryList.appendChild(tertiaryItem);
				tertiaryItem.appendChild(tertiaryA);

			})
		})
	})
	return primaryButtons;
}