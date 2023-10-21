import {get} from "../utility/get.js"


function loadTopBar(struct){
	console.log("Here start to load the top bar.");

	// --------------------------------
	const userImageDom = document.getElementById("user-image");
	const userNameDom = document.getElementById("user-name");
	const user = struct.user;

	if(user){
		userNameDom.innerText = user;
	}

	struct.children.forEach((file)=>{
		if(file.MimeType.includes("image")){

			if(userImageDom){
				get(user, file.id).then((data)=>{

					const blob = new Blob([new Uint8Array(data.bytes)], { type: data.MimeType });
					const url = URL.createObjectURL(blob);
					userImageDom.src = url;
					userImageDom.addEventListener("onload",function(){
						URL.revokeObjectURL(url);
					})

				})
			}

		}
	})


	// --------------------------------
}

export {loadTopBar};