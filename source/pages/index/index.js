
import "./normalize.css";
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
var ifElemHasClassDeleteClass = function (elClass, nameClass) {
	for (var i = 0; i < elClass.length; i++) {
		if (elClass[i].classList.contains(nameClass)) {
			elClass[i].classList.remove(nameClass);
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
	}

	addClassTemporarily(el, 'start_element', 800);

	ifElemHasClassDeleteClass(elItem, 'item__num-active-success');
	ifElemHasClassDeleteClass(elItem, 'item__num-active-unsuccess');
}

var reset = function (el) {

}

function timer (start) {
	var current_iteration = current_iteration || start;
	return function (f) {
		var callback = f || function () {};
		if (current_iteration === 0) {
			callback();
			current_iteration = start;
		}
		return current_iteration--;
	}
}

var addClassTemporarily = function (el, className, time) {

	for (var i = 0; i < el.length; i++) {
		el[i].classList.add(className);
	}

	setTimeout(function () {
		for (var i = 0; i < el.length; i++) {
			el[i].classList.remove(className);
		}
	}, time);

}

function playGame () {

	var score = 0,
			currentNum = 1,
			el = document.getElementsByClassName('item__num'),
			scoreEl = document.querySelector('.info_panel__container .score'),
			timerEl = document.querySelector('.info_panel__container .timer');

	var timer_iteration = timer(45);

	var successClick = function () {
		this.classList.add('item__num-active-success');
		currentNum++;
		score += 100;
	};

	setInterval (function () {
		var iteration = timer_iteration(function () {
			score = 0;
			currentNum = 1;
			scoreEl.innerHTML = 'Score: ' + score;
			render();
		});
		timerEl.innerHTML = 'Timer: ' + iteration + 's';
	}, 1000);

	for (var i = 0; i < el.length; i++) {
		el[i].onclick = function () {
			if (+this.textContent === currentNum) {
				successClick.call(this);

			} else if (!this.classList.contains('item__num-active-success')) { // не туда нажал, сброс
				this.classList.add('item__num-active-unsuccess');

				addClassTemporarily(el, 'hide_element', 800);

				render();

				currentNum = 1;
				if (score >= 100) {
					score -= 100;
				} else {
					score = 0;
				}

			}
			if (currentNum - 1 >= el.length) {
				render();
				currentNum = 1;
			}
			scoreEl.innerHTML = 'Score: ' + score;
		};
	}
}

open_menu();

var buttonStart = document.querySelector('#start_game');

buttonStart.onclick = function () {
	var pageContainer = document.querySelector('.container'),
			modalContainer = document.querySelector('.container__modal');

	modalContainer.classList.add('modal_hide');
	pageContainer.classList.add('modal-effect');

	function startGame() {
		render();
		playGame();
		pageContainer.removeEventListener('transitionend', startGame);
	}
	pageContainer.addEventListener('transitionend', startGame);
};
