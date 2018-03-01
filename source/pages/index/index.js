
import "./normalize.css";
import "./index.scss";
'use strict';

var sizeInfoContainer = function (elem) {
	var container = document.querySelector('.container__work__inner');
	elem.style.width = container.offsetWidth + 'px';
}

var el = document.querySelector('.info_panel__container');
sizeInfoContainer(el);

var open_menu = function () {
	var elLinkOpen = document.querySelector('.open_menu'),
			elContainer = document.querySelector('.select_size_container'),
			elOpenMenu = document.querySelector('.btn_open_menu'),
			allInputs = document.querySelectorAll('.select_size_container input');

	elLinkOpen.addEventListener('click', function() {
		for (var i = 0; i < allInputs.length; i++) {
			allInputs[i].classList.toggle('hide');
		}

		elContainer.classList.toggle('accent_bg');
		elOpenMenu.classList.toggle('white_bg');
	});
}

//Перемешать элементы массива
var blend = function (arr) {
	for (var i = arr.length - 1; i >= 0; i--) {
		var rand = Math.round(0 + Math.random() * (arr.length - 1));
		var temp = arr[rand];
		arr[rand] = arr[i];
		arr[i] = temp;
	}
}

// Удалить класс, если он есть у элемента
var ifElemHasClassDeleteClass = function (elClass, nameClass) {
	if (Boolean(elClass[1])) {
		for (var i = 0; i < elClass.length; i++) {
			if (elClass[i].classList.contains(nameClass)) {
				elClass[i].classList.remove(nameClass);
			}
		}
	} else {
		if (elClass.classList.contains(nameClass)) {
			elClass.classList.remove(nameClass);
		}
	}
}

// Отрисовать элементы
var render = function () {
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

	addClassTemporarily(el, 'start_element', 1000);
}

var reset = function (el) {
	var arr = new Array;

	for (var i = 0; i < el.length; i++)
	{
		arr[i] = i + 1;
	}

	blend(arr);
	addClassTemporarily(el, 'click_off', 1000);
	addClassTemporarily(el, 'hide_element', 800, function () {

		ifElemHasClassDeleteClass(el, 'item__num-active-success');
		ifElemHasClassDeleteClass(el, 'item__num-active-unsuccess');

		for (var i = 0; i < el.length; i++) {
			el[i].innerHTML = arr[i];
		}

		addClassTemporarily(el, 'start_element', 1000);
	});
}

var timer = function (start) {
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

var addClassTemporarily = function (el, className, time, f) {
	var callback = f || function () {};

	for (var i = 0; i < el.length; i++) {
		el[i].classList.add(className);
	}

	setTimeout(function () {
		callback();
		for (var i = 0; i < el.length; i++) {
			el[i].classList.remove(className);
		}
	}, time);
}

var playGame = function (time) {

	var score = 0,
			currentNum = 1,
			el = document.getElementsByClassName('item__num'),
			scoreEl = document.querySelector('.info_panel__container .score'),
			timerEl = document.querySelector('.info_panel__container .timer');

	var gameOver = function (score, el) {
		var modalEndContainer =  document.querySelector('.container__modal__end'),
				buttonRestart = document.querySelector('#restart_game'),
				textResult = document.querySelector('#result_game'),
				container = document.querySelector('.container');

		textResult.innerHTML = 'Ваш результат: ' + score;

		ifElemHasClassDeleteClass(modalEndContainer, 'modal_hide');

		container.classList.remove('modal-effect');

		score = 0;
		currentNum = 1;
		scoreEl.innerHTML = 'Score: ' + score;

		for (var i = 0; i < el.length; i++) {
			el[i].classList.add('click_off');
		}

		document.querySelector('#restart_game').addEventListener('click', function () {
			render();
			playGame(time);
			modalEndContainer.classList.add('modal_hide');
			container.classList.add('modal-effect');
			reset(el);

			for (var i = 0; i < el.length; i++) {
				el[i].classList.remove('click_off');
			}

		});
	}

	var timer_iteration = timer(time);
	var successClick = function () {
		this.classList.add('item__num-active-success');
		currentNum++;
		score += 100;
	};

	var counter = setInterval (function () {
		var iteration = timer_iteration(function () {
			clearInterval(counter);
			gameOver(score, el);
		});
		timerEl.innerHTML = 'Timer: ' + iteration + 's';
	}, 1000);

	var processing = function () {
		if (+this.textContent === currentNum) {
			successClick.call(this);

		} else if (!this.classList.contains('item__num-active-success')) { // не туда нажал, сброс
			this.classList.add('item__num-active-unsuccess');

			addClassTemporarily(el, 'hide_element', 800);

			reset(el);

			currentNum = 1;
			if (score >= 100) {
				score -= 100;
			} else {
				score = 0;
			}

		}
		if (currentNum - 1 >= el.length) {
			reset(el);
			currentNum = 1;
		}
		scoreEl.innerHTML = 'Score: ' + score;
	}

	for (var i = 0; i < el.length; i++) {
		var bound = processing.bind(el[i]);
		el[i].addEventListener('click', bound);
	}
}

open_menu();

var buttonStart = document.querySelector('#start_game');
var time = 45;

buttonStart.addEventListener('click', function () {
	var pageContainer = document.querySelector('.container'),
			modalStartContainer = document.querySelector('.container__modal__start');

	function startGame() {
		render();
		playGame(time);
		pageContainer.removeEventListener('transitionend', startGame);
	}

	modalStartContainer.classList.add('modal_hide');
	pageContainer.classList.add('modal-effect');

	pageContainer.addEventListener('transitionend', startGame);
});
