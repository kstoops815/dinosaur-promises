"use strict";

const dom = require("./dom");

var dinosaurs = [];

var initializer = function(){
	dom({name: "T-Rex"});
};

var getDinosaurs = function(){
	return dinosaurs;
};

module.exports = {initializer:initializer, getDinosaurs:getDinosaurs};
