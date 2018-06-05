
import "./normalize.css";
import "./index.scss";
'use strict';

window.onload = function() {

    var hideElement = function (el) {
        el.classList.add('hidden');
    };

    var showElement = function (el) {
        el.classList.remove('hidden');
    };

	var sizeInfoContainer = function (elem) {
        var container = document.querySelector('.container__work__inner');
        elem.style.width = container.offsetWidth + 'px';
    };

    var el = document.querySelector('.info_panel__container');
    sizeInfoContainer(el);

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
    };

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
    };

     var timer = function (start = 45) {
        var currentIteration = start;
        return function (f) {
            return --currentIteration;
        }
     };

    // var timer = function (start) {
    //     var current_iteration = current_iteration || start;
    //
    //     return function (f) {
    //         var callback = f || function () {};
    //         if (current_iteration === 0) {
    //             callback();
    //             current_iteration = start;
    //         }
    //         return current_iteration--;
    //     }
    // }

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

    var changeState = function (el, state, func) {
        el.style.display = state;
        el.removeEventListener('transitioned', func);
    };

    var playGame = function (time) {

        var score = 0,
            currentNum = 1,
            el = document.getElementsByClassName('item__num'),
            scoreEl = document.querySelector('.info_panel__container .score'),
            timerEl = document.querySelector('.info_panel__container .timer');

        var gameOver = function () {
            var modalEnd=  document.querySelector('.container__modal__end'),
                modalBg = document.querySelector('.modal_bg'),
                textResult = document.querySelector('#result_game');

            textResult.innerHTML = 'Ваш результат: ' + score;
            timerEl.innerHTML = 'Timer: ' + 45;

            showElement(modalEnd);
            showElement(modalBg);
            score = 0;
            currentNum = 1;
            scoreEl.innerHTML = 'Score: ' + score;

            for (var i = 0; i < el.length; i++) {
                el[i].classList.add('click_off');
            }

            document.querySelector('#restart_game').addEventListener('click', function () {
                render();
                playGame(time);
                hideElement(modalEnd);
                hideElement(modalBg);

                reset(el);
                score = 0;
                currentNum = 1;

                for (var i = 0; i < el.length; i++) {
                    el[i].classList.remove('click_off');
                }
            });
        };

        var successClick = function () {
            this.classList.add('item__num-active-success');
            currentNum++;
            score += 100;
        };

        var timer_iteration = timer(time);
        var currentTime,
            counter = timer(time);

        var timeInterval = setInterval(function () {
            currentTime = counter();
            timerEl.innerHTML = 'Timer: ' + currentTime + 's';
            if (currentTime <= 0) {
                clearInterval(timeInterval);
                counter = timer(time);
                gameOver();
            }
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
    };

    var buttonStart = document.querySelector('#start_game');
    var time = 45;

    buttonStart.addEventListener('click', function () {
        var modalBg = document.querySelector('.modal_bg'),
            modalStart= document.querySelector('.container__modal__start');

        function startGame() {
            document.querySelector('.timer').innerHTML = 'Timer: ' + time + 's';
            render();
            playGame(time);

            var currentState = function () {
                changeState(modalBg, 'none', currentState);
            };
        }

        hideElement(modalStart);
        hideElement(modalBg);
        startGame();
    });
};

