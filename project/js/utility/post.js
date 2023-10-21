import {getCurrentTime} from "../utility/tools.js"
import {md5, sha256} from "../lib/hash.js"

const postURL = `
https://script.google.com/macros/s/AKfycbxWWArRaUZFLi463aSDbPRHQIn_kN3HX0glmhaeer_Ryjjk9uArrT54_4-jjL10tHL3/exec
`;

function post(user, body){
	const postTime = getCurrentTime();
	body.postTime = postTime;
	body.user = user;
	body.id = sha256(user+postTime)
	
	// fetch(postURL, { 
	// 	"method": "POST",
	// 	"body": JSON.stringify(body)
	// })
	// .then((res) => {return res.text();})
	// .then((result) => {
	// 	const res = JSON.parse(result);
	// 	console.table(res)
	// })
	// .catch((err) => console.log("err", err));
	// console.table(body);

	console.log("The post information is:");
	console.log(body);
	console.log("Notice that the function of post has not finished yet!\nSo this request won't post anyting to the database.");
}

export {post};