"use strict";

let outputDiv = $("#dinosaur");

const createDomString = (words) => {
	let dinoString = "";
		dinoString += `<div class="shitGoesHere">`;
		dinoString +=	`<h1>${words.name}</h1>`;
		dinoString += `</div>`;
	printToDom(dinoString);
}; 	


const printToDom = (strang) => {
	outputDiv.append(strang);
};

module.exports = createDomString;