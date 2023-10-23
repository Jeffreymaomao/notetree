import {post} from "../utility/post.js"
import {createAddInputButton, forEachFolder} from "../utility/tools.js"

/* --------------------------------------------- */
/* sidebar */
function loadSideBar(struct, pageLocation, subpageLocation){
	const sidebar = document.getElementById("sidebar");
	sidebar.innerHTML = "";

	const sidebarContainerDiv = document.createElement("div");
	sidebarContainerDiv.classList.add("container");

	const sidebarListDiv = document.createElement("div");
	sidebarListDiv.classList.add("sidebar-primary-menu");

	sidebar.appendChild(sidebarContainerDiv);
	sidebarContainerDiv.appendChild(sidebarListDiv);


	/* home */
	var isHome = (pageLocation === struct.id || !pageLocation) && !subpageLocation; // if page is root or undefined

	const sidebarItems = [];
	sidebarItems.push(
		createSidebarItem(struct, `?page=${struct.id}`, isHome, false)
	);

	forEachFolder(struct.children, (page)=>{
		var active = pageLocation===page.id;
		if(!active){
			forEachFolder(page.children,(title)=>{
				forEachFolder(title.children, (subtitle)=>{
					forEachFolder(subtitle.children,(subpage)=>{
						if(subpageLocation===subpage.id){
							active = true;
						}
					})
				})
			})
		}

		const sidebarItem = createSidebarItem(page, `?page=${page.id}`, active, true);
		const sidebarList = createNestedList(page, active);
		sidebarItems.push(sidebarItem);
		sidebarItems.push(sidebarList);
	})

	sidebarListDiv.append(...sidebarItems);
	/* append primary button DOM element*/
}

function createSidebarItem(obj, href, isActive, expandBtn) {
	const item = document.createElement('a');
	item.classList.add('sidebar-primary-item');
	item.draggable = false;

	item.href = href;
	if (isActive) {
		item.classList.add('active');
	}

	const iconContainer = document.createElement('div');
	iconContainer.classList.add('icon-container');

	const icon = document.createElement('div');
	icon.classList.add('icon');

	const textContainer = document.createElement('div');
	textContainer.classList.add('text-container');

	const textDiv = document.createElement('div');
	textDiv.classList.add('text');
	textDiv.textContent = obj.name;

	item.appendChild(iconContainer);
	item.appendChild(textContainer);
	iconContainer.appendChild(icon);
	textContainer.appendChild(textDiv);

	if(expandBtn){
		icon.classList.add(`${obj.name}-icon`);

		/* expand icon */
		const expandContainer = document.createElement('div');
		expandContainer.classList.add("btn-container");

		const expand = document.createElement('div');
		expand.classList.add("icon");
		if(isActive){
			expand.classList.add("expanded-icon");
		}else{
			expand.classList.add("collapsed-icon");
		}

		item.appendChild(expandContainer);
		expandContainer.appendChild(expand);

		/* Event Listener */
		sideBarEventListener(expandContainer);
	}else{
		icon.classList.add("main-icon");
	}

	return item;
}

function createNestedList(page, isActive) {
	const list = document.createElement('ul');
	list.classList.add('sidebar-secondary-menu');

	forEachFolder(page.children, (item) => {
		const listItem = document.createElement('li');
		listItem.classList.add('sidebar-secondary-item');

		const listItemA = document.createElement('a');
		listItemA.classList.add("text-container");
		listItemA.draggable = false;

		const listItemSubList = document.createElement('ul');
		listItemSubList.classList.add("sidebar-tertiary-menu");

		list.appendChild(listItem);
		listItem.appendChild(listItemA);
		list.appendChild(listItemSubList);


		listItemA.textContent = item.name;
		listItemA.href = `?page=${page.id}#${item.id}`

		forEachFolder(item.children, (sub)=>{
			const subItem = document.createElement('li');
			subItem.classList.add("sidebar-tertiary-item");

			const subItemA = document.createElement('a');
			subItemA.draggable = false;
			subItemA.classList.add("text-container");

			listItemSubList.appendChild(subItem);
			subItem.appendChild(subItemA);

			subItemA.textContent = sub.name;
			subItemA.href = `?page=${page.id}#${sub.id}`;
		})
	});

	// Here using a trick: `setTimeout with 0ms makes code run after the current event loop tick.`
	setTimeout(() => {
        if (isActive) {
            list.style.maxHeight = list.scrollHeight + "px";
        }
    }, 0);


	return list;
}

function sideBarEventListener(button){
	button.addEventListener("click",(e)=>{
		e.preventDefault();
		button.querySelector(".icon").classList.toggle("expanded-icon");
		button.querySelector(".icon").classList.toggle("collapsed-icon");
		const menu = button.parentElement.nextElementSibling;
		if(menu){
			if (menu.style.maxHeight) {
		    	menu.style.maxHeight = null;
		    } else {
		    	menu.style.maxHeight = menu.scrollHeight + "px";
		    } 
		}
	})
}


export {loadSideBar, createSidebarItem, createNestedList, sideBarEventListener};