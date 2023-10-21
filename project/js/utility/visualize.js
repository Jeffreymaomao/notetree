function visualize(file){
	const id = file.id;
	/* ----------------- Display Image ----------------- */
	if(file.MimeType.includes("image")){
		const img = document.createElement("img");
		const blob = new Blob([new Uint8Array(file.bytes)], { type: file.MimeType });
		const url = URL.createObjectURL(blob);
		img.width = "500";
		img.src = url;
		img.classList.add("image")
		img.addEventListener("onload",function(){
			URL.revokeObjectURL(url);
		})
		return img;
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
		return div;
	}
	/* ----------------- Display PDF ----------------- */
	if(file.MimeType.includes("pdf")){
		const iframe = document.createElement("iframe");
		const blob = new Blob([new Uint8Array(file.bytes)], { type: file.MimeType });
		const url = URL.createObjectURL(blob);
		iframe.height = "700px";
		iframe.width = "500px";
		iframe.src = url;
		iframe.classList.add("iframe")
		iframe.addEventListener("onload",function(){
			URL.revokeObjectURL(url);
		})
		return iframe;
	}
}

export {visualize};