const getURL  = `
https://script.google.com/macros/s/AKfycbzQypOC05ebgmLXOmq8gu5IUsaqNV9PCpxV9BOajQXamWUQX0kaPdUxfng-fYvG6WxcxA/exec
`;

const loadedFile = new Object(); // this variable will always exist when call get function;
function get(user, id){
	const fetchURL = id ? getURL + '?id=' + id : getURL;
	if(loadedFile[id]){
		return Promise.resolve(loadedFile[id]);
	}
	
	return fetch(fetchURL, { "method": "GET"})
		.then((res) => {return res.text();})
        .catch(err => {
            return err;  // Re-throw the error so that it can be caught by the caller
        })
		.then((result) => {
			if(!result){
				return null;
			}
			if(result === "Received text: TypeError: Failed to fetch"){
				return null;
			}
			// -----
            const Drive = JSON.parse(result);
			if(Drive.file){
				loadedFile[Drive.file.id] = Drive.file;
				return Drive.file;
			}
			if(Drive.struct){
				return Drive; 
			}
			
		})
		.catch((err) => {
			console.error(`err for id (${id})`, err);
		});
}

export {get};