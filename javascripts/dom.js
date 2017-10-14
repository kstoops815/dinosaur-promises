"use strict";

let outputDiv = $("#dinosaur");

const createDomString = (dinosaurs) => {
	let dinoString = "";
		dinoString += `<div class="${dinosaurs.info === 'Carnivore' ? 'card-bad' : 'card-good'}">`;
		dinoString +=	`<h1>${dinosaurs.type}</h1>`;
		dinoString +=	`<h4>${dinosaurs.bio}</h4>`;
		if (dinosaurs.info === 'Carnivore') {
			dinoString += `<h4>Has some tasty snacks.</h4>`;
		} else {
			dinoString += `<h4>Has some adorable (debatable) friends.</h4>`;
		}
		dinoString += `<div class="card-holder">`;
		dinosaurs.snacks.forEach((cat) => {
			dinoString += `<div class="card">`;
			dinoString += `<h5>${cat.name}</h5>`;
			dinoString += `<div class="card-img">`;
			dinoString += `<img src=${cat.imageUrl}>`;
			dinoString += `</div>`;
			dinoString += `<p class="card-description">${cat.specialSkill}</p>`;
			dinoString += `</div>`;
		});
		dinoString += `</div>`;
		dinoString += `</div>`;
	printToDom(dinoString);
}; 	


const printToDom = (strang) => {
	outputDiv.append(strang);
};

module.exports = createDomString;