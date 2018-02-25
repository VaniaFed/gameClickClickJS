
import "./index.scss";
'use strict';

function sizeInfoContainer(elem) {
	var container = document.querySelector('.container__work__inner');
	elem.style.width = container.offsetWidth + 'px';
}

var el = document.querySelector('.info_panel__container');
sizeInfoContainer(el);

function open_menu () {
	var elLinkOpen = document.querySelector('.open_menu'),
			elContainer = document.querySelector('.select_size_container'),
			elOpenMenu = document.querySelector('.btn_open_menu'),
			allInputs = document.querySelectorAll('.select_size_container input');

	elLinkOpen.onclick = function() {
		for (var i = 0; i < allInputs.length; i++) {
			allInputs[i].classList.toggle('hide');
		}

		elContainer.classList.toggle('accent_bg');
		elOpenMenu.classList.toggle('white_bg');
	}
}

//Перемешать элементы массива
function blend (arr) {
	for (var i = arr.length - 1; i >= 0; i--) {
		var rand = Math.round(0 + Math.random() * (arr.length - 1));
		var temp = arr[rand];
		arr[rand] = arr[i];
		arr[i] = temp;
	}
}

// Удалить класс, если он есть у элемента
var ifElemHasClassDeleteClass = function (elClass) {
	for (var i = 0; i < elClass.length; i++) {
		if (elClass[i].classList.contains('item__num-active')) {
			elClass[i].classList.remove('item__num-active');
		}
	}
}

// Отрисовать элементы
function render () {
	var elItem = document.getElementsByClassName('item__num');
	var arr = new Array;

	for (var i = 0; i < elItem.length; i++)
	{
		arr[i] = i + 1;
	}

	blend(arr);

	for (var i = 0; i < elItem.length; i++) {
		elItem[i].innerHTML = arr[i];
		ifElemHasClassDeleteClass(elItem[i]);
	}
}

function timer (start) {
	var current_iteration = start || 0;
	return function (f) {
		var callback = f || function () {};
		if (current_iteration === 0) {
			callback();
			current_iteration = 30;
		}
		return current_iteration--;
	}
}

function playGame () {
	var score = 0,
			currentNum = 1,
			el = document.getElementsByClassName('item__num'),
			scoreEl = document.querySelector('.info_panel__container .score'),
			timerEl = document.querySelector('.info_panel__container .timer');

	var timer_iteration = timer(30);

	var successClick = function () {
		this.classList.toggle('item__num-active');
		currentNum++;
		score += Math.round(100 + Math.random() * (150 - 100));

	}

	setInterval (function () {
		var iteration = timer_iteration(function () {
//
//
//
// ОТОБРОЗИТЬ МОДАЛЬНОЕ ОКНО
// С РЕЗУЛЬТАТАМИ
// И ПРЕДЛОГОМ ПРОДОЛЖИТЬ
//
//
//
			score = 0;
			currentNum = 1;
			scoreEl.innerHTML = 'Score: ' + score;
			ifElemHasClassDeleteClass(el);
		});
		timerEl.innerHTML = 'Timer: ' + iteration + 's';
	}, 1000);

	for (var i = 0; i < el.length; i++) {
		el[i].onclick = function () {
			if (+this.textContent === currentNum) {
				successClick.call(this);

			} else if (!this.classList.contains('item__num-active')) { // не туда нажал, сброс
				render();
				ifElemHasClassDeleteClass(el);
				currentNum = 1;
				if (score >= 100) {
					score -= Math.round(80 + Math.random() * (100 - 80));
				} else {
					score = 0;
				}

			}
			if (currentNum > el.length) {
				render();
				currentNum = 1;
			}
			scoreEl.innerHTML = 'Score: ' + score;
		};
	}
}

open_menu();
render();
playGame();
