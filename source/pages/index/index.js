
import "./index.scss";
'use strict';

var open_menu = function () {
	var el = document.querySelector('.open_menu');
	el.onclick = function() {
		var el_cont = document.querySelector('.select_size_container'),
				el_open_menu = document.querySelector('.btn_open_menu');

		el_cont.classList.toggle('select_size_container-active');
		el_open_menu.classList.toggle('btn_open_menu-opened');
	}
}


open_menu();

var el = document.getElementsByClassName('item__num');

console.log(el.length);
for (var i = 0; i < el.length; i++) {
    el[i].innerHTML = '' + i;
}
var currentNum = 0;
function playGame () {

	el[currentNum].onclick = function () {
			console.log(this);
	};

	currentNum++;

	setInterval(function () {
	  console.log(el[currentNum]);
	}, 1000);
}

playGame();
