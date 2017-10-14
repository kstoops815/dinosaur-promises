(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const dom = require("./dom");

var dinosaurs = [];

// The old way - Pyramid of DOOM
// var dinoGetter = function(){
// 	$.ajax("./db/dinosaurs.json").done(function(data1){
// 		console.log("data1", data1);
// 		data1.dinosaurs1.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		$.ajax("./db/dinosaurs2.json").done(function(data2){
// 			data2.dinosaurs2.forEach(function(dino){
// 			console.log("data2", data2);
// 				dinosaurs.push(dino);
// 			});
// 			$.ajax("./db/dinosaurs3.json").done(function(data3){
// 				console.log("data3", data3);
// 				data3.dinosaurs3.forEach(function(dino){
// 					dinosaurs.push(dino);
// 				});
// 				console.log("dinosaurs after foreach", dinosaurs);
// 			});
// 		});
// 	});
// };

//PROMISES works - promise Pryamid of DOOM
const firstDinosaurJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax("./db/dinosaurs.json").done((data1) => {
			resolve(data1.dinosaurs1);
		}).fail((error1) => {
			reject(error1);
		});
	});
};

const secondDinosaurJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax("./db/dinosaurs2.json").done((data2) => {
			resolve(data2.dinosaurs2);
		}).fail((error2) => {
			reject(error2);
		});
	});
};

const thirdDinosaurJSON = () => {
	return new Promise((resolve, reject) => {
		$.ajax("./db/dinosaurs3.json").done((data3) => {
			resolve(data3.dinosaurs3);
		}).fail((error3) => {
			reject(error3);
		});
	});
};

// var dinoGetter = function(){
// 	firstDinosaurJSON().then(function(results){
// 		results.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		secondDinosaurJSON().then(function(results){
// 			results.forEach(function(dino){
// 				dinosaurs.push(dino);
// 			});
// 			thirdDinosaurJSON().then(function(results){
// 				results.forEach(function(dino){
// 					dinosaurs.push(dino);
// 				});
// 			console.log("dinosaurs", dinosaurs);
// 			});
// 		});		
// 	}).catch(function(error){
// 		console.log("error from dino1", error);
// 	});
// };

//Promise - Correct Way
// var dinoGetter = function(){
// 	firstDinosaurJSON().then(function(results){
// 		results.forEach(function(dino){
// 			dinosaurs.push(dino);
// 		});
// 		return secondDinosaurJSON();
// 	}).then(function(results2){
// 		results2.forEach(function(dino){
// 			dinosaurs.push(dino);
// 	});
// 		return thirdDinosaurJSON();
// }).then(function(results3){
// 	results3.forEach(function(dino){
// 		dinosaurs.push(dino);
// 	});
// 	console.log("dinosaurs", dinosaurs);
// 	makeDinos();
// });
// };


const allTheCats = () => {
	return new Promise((resolve, reject) => {
		$.ajax("./db/cats.json").done((catData) => {
			resolve(catData.cats);
		}).fail((error) => {
			reject(error);
		});
	});
};


//This only works when they do not depend on each other
const dinoGetter = () => {
	console.log("in dino getter");
	Promise.all([firstDinosaurJSON(), secondDinosaurJSON(), thirdDinosaurJSON()]).then((results) => {
		allTheCats().then((cats) => {
			results.forEach((result) => {
				result.forEach((dino) => {
					dino.snacks = [];
					dino.catIds.forEach((catId) => {
						cats.forEach((cat) => {
							if(cat.id === catId){
								dino.snacks.push(cat);
							}
						});
					});
					dinosaurs.push(dino);
				});
			});
			makeDinos();
		});
		console.log("dino", dinosaurs);
	}).catch((error) => {
		console.log("error from Promise.all", error);
	});
};

const makeDinos = () => {
	dinosaurs.forEach((dino) => {
		dom(dino);
	});
};

var initializer = () => {
	console.log("inside initializer");
	dinoGetter();
};

var getDinosaurs = () => {
	return dinosaurs;
};

module.exports = {initializer:initializer, getDinosaurs:getDinosaurs};

},{"./dom":2}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict";

var data = require("./data");

$(document).ready(() => {
	data.initializer();
});
},{"./data":1}]},{},[3]);
