import {get} from "../utility/get.js"
import {getLatestImage} from "../utility/tools.js"



function loadTopBar(struct){
	// --------------------------------
	const userImageDom = document.getElementById("user-image");
	const userNameDom = document.getElementById("user-name");
	const menuBtnDom = document.getElementById("menu-btn");
	const sidebarDom = document.getElementById("sidebar");
	
	const user = struct.user;
	const userImageBase64 = sessionStorage.getItem("userImage");

	if(user){
		userNameDom.innerText = user;
	}

	if(userImageBase64){
		userImageDom.src = "data:image/jpeg;base64," + userImageBase64;
	}

	const latestFile = getLatestImage(struct.children);

	if (latestFile && userImageDom) {
	    get(user, latestFile.id).then((data) => {
	        let base64Image = btoa(String.fromCharCode(...new Uint8Array(data.bytes)));
	        sessionStorage.setItem("userImage", base64Image);
	        userImageDom.src = "data:image/jpeg;base64," + base64Image;
	    });
	}
	// --------------------------------
	if(!menuBtnDom) return;
	menuBtnDom.addEventListener("click",(e)=>{
		sidebarDom.classList.toggle("open");
	});
}

export {loadTopBar};