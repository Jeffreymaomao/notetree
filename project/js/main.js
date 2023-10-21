import {loadTopBar} from "./component/topbar.js";
import {loadHome} from "./component/home.js";
import {loadPage} from "./component/page.js";
import {loadSubPage} from "./component/subpage.js";
import {loadSideBar} from "./component/sidebar.js";
import {md5, sha256} from "./lib/hash.js";
import {get} from "./utility/get.js"

const user = "Chang Mao Yang";

window.addEventListener("load", e => {
    if (window.localStorage.NoteTree) {
        const NoteTree = JSON.parse(window.localStorage.NoteTree);
        if (NoteTree.struct) {
            main(NoteTree.struct);
            console.log("first load from localStorage !")
        }
    }
    get(user).then((Drive) => {
		Drive.struct.user = user;
		main(Drive.struct);
		window.localStorage.NoteTree = JSON.stringify(Drive);
	}).catch((error) => {
	    console.error(error);
	});
});

/* --------------------------------------------- */
function main(struct){
	loadTopBar(struct);

	console.log("parse struct");
	const urlParams = new URLSearchParams(window.location.search);
	const page = urlParams.get("page");
	const subpage = urlParams.get("subpage");
	const isHome = ((page === struct.id)||(!page)) && (!subpage); 
	if(isHome){
		loadHome(struct);
	}else if(page){
		loadPage(struct, page);
	}else if(subpage){
		loadSubPage(struct, subpage)
	}
	loadSideBar(struct, page, subpage);
}


