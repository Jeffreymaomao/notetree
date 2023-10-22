import {get} from "../utility/get.js"
import {getLatestImage} from "../utility/tools.js"



function loadTopBar(struct){
	console.log("Here start to load the top bar.");

	// --------------------------------
	const userImageDom = document.getElementById("user-image");
	const userNameDom = document.getElementById("user-name");
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
}

export {loadTopBar};