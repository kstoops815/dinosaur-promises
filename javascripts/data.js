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
		}).fail(function(error1){
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



//This only works when they do not depend on each other
const dinoGetter = () => {
	Promise.all([firstDinosaurJSON(), secondDinosaurJSON(), thirdDinosaurJSON()]).then(function(results){
		console.log("results from promise.all", results);
		results.forEach((result) => {
			console.log("result", result);
			result.forEach((dino) => {
				console.log("dino", dino);
				dinosaurs.push(dino);
			});
		});
		makeDinos();
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
	dinoGetter();
};

var getDinosaurs = () => {
	return dinosaurs;
};

module.exports = {initializer:initializer, getDinosaurs:getDinosaurs};
