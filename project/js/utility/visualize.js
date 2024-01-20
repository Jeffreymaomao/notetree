import {get} from "../utility/get.js";

function visualize(file){
	const contentContainer = document.createElement("div");
	contentContainer.classList.add("content-container");

	/* ----------------- Display Image ----------------- */
	if(file.MimeType.includes("image")){
		const img = document.createElement("img");
		const blob = new Blob([new Uint8Array(file.bytes)], { type: file.MimeType });
		const url = URL.createObjectURL(blob);
		img.src = url;
		img.classList.add("image")
		img.addEventListener("onload",function(){
			URL.revokeObjectURL(url);
		})
		contentContainer.appendChild(img);
		return contentContainer;
	}
	/* ----------------- Display Text ----------------- */
	if(file.MimeType.includes("text")){
		// if(file.MimeType.includes("markdown")){
		// 	console.log("markdown");
		// 	const markdownDiv = document.createElement("div");
		// 	const text = new TextDecoder().decode(new Uint8Array(file.bytes));
		//     var html = new showdown.Converter().makeHtml(text);
		//     markdownDiv.innerHTML = html;
		//     return markdownDiv;
		// }
		const p = document.createElement("p");
		const div = document.createElement("pre");
		const text = new TextDecoder().decode(new Uint8Array(file.bytes));
		p.textContent = text;
		div.classList.add("text")
		div.appendChild(p);
		contentContainer.appendChild(div);
		return contentContainer;
	}
	/* ----------------- Display PDF ----------------- */
	if(file.MimeType.includes("pdf")){
		const iframe = document.createElement("iframe");
		const blob = new Blob([new Uint8Array(file.bytes)], { type: file.MimeType });
		const url = URL.createObjectURL(blob);
		iframe.src = url;
		iframe.classList.add("iframe")
		iframe.addEventListener("onload",function(){
			URL.revokeObjectURL(url);
		});

		iframe.height = document.body.scrollHeight - 64;
		window.addEventListener("resize",(e)=>{
			iframe.height = document.body.scrollHeight - 64;
		});
		contentContainer.appendChild(iframe);
		return contentContainer;
	}
	return null;
}

function loadFile(struct, id) {
	const contentDOM = document.querySelector("#content");
	contentDOM.classList.toggle("loader");
	get(struct.user, id).then((result) => {
		contentDOM.classList.toggle("loader");
		const displayDiv = visualize(result);
		if(displayDiv){
			contentDOM.appendChild(displayDiv);
			displayDiv.classList.add("expand");
		}
	}).catch((error) => {
	    console.error(error);
	});
}

export {visualize, loadFile};