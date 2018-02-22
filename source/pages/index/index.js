
import "./index.scss";
'use strict';



function sizeInfoContainer() {
	var container = document.querySelector('.container__work__inner'),
			el = document.querySelector('.info_panel__container');

	el.style.width = container.offsetWidth + 'px';
	console.log(el.style.width);
}

function open_menu () {
	var el = document.querySelector('.open_menu'),
			el_cont = document.querySelector('.select_size_container'),
			el_open_menu = document.querySelector('.btn_open_menu'),
			all_inputs = document.querySelectorAll('.select_size_container input');
			
			for (var i = 0; i < all_inputs.length; i++) {
				all_inputs[i].classList.toggle('hide');
			}
			el_cont.classList.toggle('select_size_container-active');
			el_open_menu.classList.toggle('btn_open_menu-opened');
	el.onclick = function() {
		for (var i = 0; i < all_inputs.length; i++) {
			all_inputs[i].classList.toggle('hide');
		}

		el_cont.classList.toggle('select_size_container-active');
		el_open_menu.classList.toggle('btn_open_menu-opened');
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

//отрисовать элементы
function render() {
	var el = document.getElementsByClassName('item__num');
	var arr = new Array;

	for (var i = 0; i < el.length; i++) {
		arr[i] = i+1;
		el[i].innerHTML = '' + i+1;
		if (el[i].classList.contains('item__num-active')) {
			el[i].classList.remove('item__num-active');
		}
	}

	blend(arr);

	for (var i = 0; i < el.length; i++) {
		el[i].innerHTML = arr[i];
	}
}

function playGame () {
	var score = 0,
			currentNum = 1,
			el = document.getElementsByClassName('item__num'),
			scoreEl = document.querySelector('.info_panel__container .score');

	for (var i = 0; i < el.length; i++) {
		el[i].onclick = function () {
			if (this.textContent == currentNum) {
				this.classList.toggle('item__num-active');
				currentNum++;
				score += 100;
			} else if (!this.classList.contains('item__num-active')) {
				render();
				for (var i = 0; i < el.length; i++) {
					if (el[i].classList.contains('item__num-active'))
						el[i].classList.remove('item__num-active');
				}
				currentNum = 1;
				if (score >= 100)
					score -= 100;
			}
			if (currentNum > el.length) {
				render();
				currentNum = 1;
			}
			console.log('currentNum = ' + currentNum + ' lenght = ' + Number(el.length));
			scoreEl.innerHTML = 'Score: ' + score;
		};
	}
}

sizeInfoContainer();
open_menu();
render();
playGame();
