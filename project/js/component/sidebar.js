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
	var isHereId = null;
	forEachFolder(struct.children, (page)=>{
		var expand = pageLocation===page.id; // check first order
		if(!expand){
			forEachFolder(page.children,(title)=>{
				forEachFolder(title.children, (subtitle)=>{
					forEachFolder(subtitle.children,(subpage)=>{
						if(subpageLocation===subpage.id){
							expand = true;
							isHereId = subtitle.id;
							return;
						}
					})
				})
			})
		}

		const sidebarItem = createSidebarItem(page, `?page=${page.id}`, expand, true);
		const sidebarList = createNestedList(page, expand, isHereId);
		sidebarItems.push(sidebarItem);
		sidebarItems.push(sidebarList);
	});

	sidebarListDiv.append(...sidebarItems);
	/* append primary button DOM element*/
	if(!isHereId){
		checkSideBarItemIsHere();
	}
	addEventListener("hashchange", checkSideBarItemIsHere);
}

function checkSideBarItemIsHere(isHereId, e){
	const hash = window.location.hash;
	[...document.querySelectorAll(".sidebar-secondary-item, .sidebar-tertiary-item")].forEach((item)=>{
		item.classList.remove("is-here")
		const id = item.querySelector("a").href.split("#").reverse()[0];
		if(hash===`#${id}`) item.classList.add("is-here")
	});
}

function createSidebarItem(obj, href, expand, expandBtn) {
	const item = document.createElement('a');
	item.classList.add('sidebar-primary-item');
	item.draggable = false;

	item.href = href;
	if (expand) {
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

		const expandDOM = document.createElement('div');
		expandDOM.classList.add("icon");
		if(expand){
			expandDOM.classList.add("expanded-icon");
		}else{
			expandDOM.classList.add("collapsed-icon");
		}

		item.appendChild(expandContainer);
		expandContainer.appendChild(expandDOM);

		/* Event Listener */
		sideBarEventListener(expandContainer);
	}else{
		icon.classList.add("main-icon");
	}

	return item;
}

function createNestedList(page, expand, isHereId) {
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

			subItemA.textContent = sub.name;
			subItemA.href = `?page=${page.id}#${sub.id}`;

			if(isHereId && (sub.id===isHereId)){
				subItem.classList.add("is-here");
			}

			listItemSubList.appendChild(subItem);
			subItem.appendChild(subItemA);
		})
	});

	// Here using a trick: `setTimeout with 0ms makes code run after the current event loop tick.`
	setTimeout(() => {
        if (expand) {
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