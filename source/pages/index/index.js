
import "./index.scss";
'use strict';

var open_menu = function () {
	var el = document.querySelector('.open_menu');

	el.onclick = function() {
		var el_cont = document.querySelector('.select_size_container'),
				el_open_menu = document.querySelector('.btn_open_menu'),
				all_inputs = document.querySelectorAll('.select_size_container input');

		for (var i = 0; i < all_inputs.length; i++) {
			all_inputs[i].classList.toggle('hide');
		}

		el_cont.classList.toggle('select_size_container-active');
		el_open_menu.classList.toggle('btn_open_menu-opened');
	}
}


open_menu();

//отрисовать элементы
function render() {
	var el = document.getElementsByClassName('item__num');
	var arr = new Array;

	for (var i = 0; i < el.length; i++) {
		arr[i] = i+1;
		el[i].innerHTML = '' + i+1;
	}

	blend(arr);

	for (var i = 0; i < el.length; i++) {
		el[i].innerHTML = arr[i];
	}
}

//Перемешать элементы массива
function blend(arr) {
	for (var i = arr.length - 1; i >= 0; i--) {
		var rand = Math.round(0 + Math.random() * (arr.length - 1));
		var temp = arr[rand];
		arr[rand] = arr[i];
		arr[i] = temp;
	}
}


function playGame () {
	var el = document.getElementsByClassName('item__num');
	var currentNum = 1;
	for (var i = 0; i < el.length; i++) {
		el[i].onclick = function () {
			if (this.textContent == currentNum) {
				this.classList.toggle('item__num-active');
					currentNum++;
			}
		};
	}
}

render();
playGame();
