// This Page is Note Page, but for convenient, I call it subsubpage.

import {get} from "../utility/get.js";
import {visualize} from "../utility/visualize.js";
import {forEachFolder} from "../utility/tools.js"; 

const unsupportedExtensions = [

    // executable file 
    '.exe', '.bin', '.bat',

    // system file
    '.sys', '.dll', '.so',

    // some compressed file
    '.zip', '.rar', '.tar.gz', '.7z', 

    // soome data
    '.sql', '.db', // CSV 文件可能需要特殊处理才能显示

    // some script
    '.xml', '.yml', '.yaml', '.ini',

    // Logfile
    '.log', '.bak',

    // other
    '.iso', '.dmg', '.ds_store', '.xmind',

    // Microsoft Office
    '.doc', '.docx',
    '.ppt', '.pptx',
    '.xls', '.xlsx',

    // Mac OS
    '.numbers',

    // latex 
    '.synctex.gz', '.aux', 'hnt',

];

function isUnsupportedExtension(fileName) {
    return unsupportedExtensions.some(extension => fileName.toLowerCase().endsWith(extension));
    // return unsupportedExtensions.includes(extension);
}

function createAndAppendElement(parent, tag, attributes = {}) {
    const element = document.createElement(tag);

    // class 
    if (attributes.class) {
        attributes.class.split(" ").forEach(className => element.classList.add(className));
        delete attributes.class;  // delete class in attributes
    }
    // dataset
    console.log(attributes.dataset)
    if (attributes.dataset) {
        Object.keys(attributes.dataset).forEach(key => element.dataset[key] = attributes.dataset[key]);
        delete attributes.dataset;  // delete dataset in attributes
    }
    // other attributes
    Object.keys(attributes).forEach(key => element[key] = attributes[key]);

    parent.appendChild(element);
    return element;
}



function addIconToElement(element, iconClass, href) {
    const icon = createAndAppendElement(element, "a", { href: href, target: '_blank' });
    icon.classList.add("icon", iconClass);
}

function findSubpage(folder, subpageId) {
    if (!folder || !folder.children) return null;
    // found main
    for (let child of folder.children) {
        if (child.id === subpageId) {
            return child; // found subpage => return [object]
        }
        // recursion
        const found = findSubpage(child, subpageId);
        if (found) return found;
    }
    return null; // not found subpage => return null
}


function fetchAndDisplayData(struct, parentNode, event) {
	parentNode.classList.add("waiting");
	parentNode.removeEventListener("click", parentNode.boundFetchAndDisplayData);

    get(struct.user, parentNode.id).then((file) => {
		parentNode.classList.remove("waiting");
        if (!file) {
            parentNode.classList.add("get-empty");
            return;
        }
        parentNode.classList.add("get");
        const displayDiv = visualize(file);
        if (displayDiv) {
            parentNode.appendChild(displayDiv);
            parentNode.addEventListener("click", (e) => {
                if (e.target===parentNode) displayDiv.classList.toggle("expand");
            });
        }
    }).catch((error) => {
        console.error(error);
    });
}

function displayNote(struct, subpage, container, level = 1) {
    if (!subpage.MimeType.includes("directory")) return;

    const list = createAndAppendElement(container, "ul", {
        class: "folder-list"
    });

    subpage.children.forEach(element => {
        if(isUnsupportedExtension(element.name))return;
        var listItem = document.getElementById(element.id);
        if (listItem) return; // if it already exist

        listItem = createAndAppendElement(list, "li", { 
            class: "folder-list-item"
        });

        if(level===1){listItem.classList.add("root-folder-list-item");}

        if (element.MimeType.includes("directory")) {
            const folderNameContainer = createAndAppendElement(listItem, 'a', {
                class: "folder-container",
                href: `#${element.id}`
            });
            const headingLevel = Math.min(level + 1, 6); // limit between <h2> to <h6>
            const folderName = createAndAppendElement(folderNameContainer, `h${headingLevel}`, {
                textContent: element.name,
                class: "text folder-text folder-name-anchor-icon",
            })
            displayNote(struct, element, listItem, level + 1);
        } else {
            const fileItem = createAndAppendElement(listItem, "div", { 
                id: element.id, 
                class: "file-container",
                textContent: element.name,
                dataset: {
                    mimeType: element.MimeType, 
                    time: element.time, 
                    driveUrl: element.url
                }
            });
            fileItem.boundFetchAndDisplayData = fetchAndDisplayData.bind(null, struct, fileItem);
            fileItem.addEventListener("click", fileItem.boundFetchAndDisplayData);
            addIconToElement(fileItem, "new-tab-icon", `?id=${element.id}`);
        }
    });
}



// -------------------------------------------------------------------------------------
function loadSubPage(struct, subpageId){
	const content = document.getElementById("content");
	content.innerHTML = "";

	const foundSubpage = findSubpage(struct, subpageId);
	if (!foundSubpage) return;

    const cardWrapperDiv = createAndAppendElement(content, "div", { id: "card-wrapper", class: "hero"});
    const cardWrapperContainerDiv = createAndAppendElement(cardWrapperDiv, "div", {class: "container"});
    const titleH1ContainerDiv = createAndAppendElement(cardWrapperContainerDiv, "a", { draggable: false, href: `#${foundSubpage.id}` });
    const titleH1Div = createAndAppendElement(titleH1ContainerDiv, "h1", { class: "text folder-text folder-name-anchor-icon", innerText: foundSubpage.name });

    displayNote(struct, foundSubpage, cardWrapperContainerDiv);
}
export {loadSubPage};

