"use strict";

let outputDiv = $("#dinosaur");

const createDomString = (dinosaurs) => {
	let dinoString = "";
		dinoString += `<div class="shitGoesHere">`;
		dinoString +=	`<h1>${dinosaurs.type}</h1>`;
		dinoString += `</div>`;
	printToDom(dinoString);
}; 	


const printToDom = (strang) => {
	outputDiv.append(strang);
};

module.exports = createDomString;