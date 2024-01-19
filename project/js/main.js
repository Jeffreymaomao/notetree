import {loadTopBar} from "./component/topbar.js";
import {loadHome} from "./component/home.js";
import {loadPage} from "./component/page.js";
import {loadSubPage} from "./component/subpage.js";
import {loadSideBar} from "./component/sidebar.js";
import {md5, sha256} from "./lib/hash.js";
import {get} from "./utility/get.js";
import {loadFile} from "./utility/visualize.js";
import {Loader} from "./utility/tools.js";

const user = "Chang Mao Yang";
var loadedNum = 0;
var loader = null;

window.addEventListener("load", (e) => {
	// if struct already in window.localStorage 
    if(window.localStorage.NoteTree) {
    	loader = new Loader(document.body, {full_screen:true});
        const NoteTree = JSON.parse(window.localStorage.NoteTree);
        if (NoteTree.struct) {
            main(NoteTree.struct);
            console.log("The first load from localStorage !");
        }
    }else{
		loader = new Loader(document.body, {full_screen:true});
    }
    fetchStruct();
    setInterval(fetchStruct, 5 * 60 * 1000); // 5 min = 5 * 60 * 1000 ms
});

/* --------------------------------------------- */
function fetchStruct() {
    get(user).then((Drive) => {
        Drive.struct.user = user;
        main(Drive.struct);
        window.localStorage.NoteTree = JSON.stringify(Drive);
        console.log("Drive data updated.");
    }).catch((error) => {
        console.error(error);
    });
}

/* --------------------------------------------- */
function main(struct){
	if(loader) loader.remove(); // if there is loader => remove
	
	loadTopBar(struct); // load top bar first
	const urlParams = new URLSearchParams(window.location.search);
	const page = urlParams.get("page");
	const subpage = urlParams.get("subpage");
	const isHome = ((page === struct.id)||(!page)) && (!subpage); 
	const id = urlParams.get("id");
	// ----
	if(id){
		if(loadedNum) return; // if it has been loaded => not loaded again
		loadFile(struct, id);
		loadedNum += 1; // loadedNum + 1
	}else if(isHome){
		loadHome(struct);
	}else if(page){
		loadPage(struct, page);
	}else if(subpage){
		loadSubPage(struct, subpage);
	}
	loadSideBar(struct, page, subpage);
	
}


