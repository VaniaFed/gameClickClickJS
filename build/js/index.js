webpackJsonp([0],[function(e,t){},function(e,t){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=n(1),r=(n.n(c),n(0)),o=(n.n(r),document.querySelector(".info_panel__container"));!function(e){var t=document.querySelector(".container__work__inner");e.style.width=t.offsetWidth+"px"}(o);var i=function(e){for(var t=e.length-1;t>=0;t--){var n=Math.round(0+Math.random()*(e.length-1)),c=e[n];e[n]=e[t],e[t]=c}},s=function(e,t){if(Boolean(e[1]))for(var n=0;n<e.length;n++)e[n].classList.contains(t)&&e[n].classList.remove(t);else e.classList.contains(t)&&e.classList.remove(t)},a=function(){for(var e=document.getElementsByClassName("item__num"),t=new Array,n=0;n<e.length;n++)t[n]=n+1;i(t);for(var n=0;n<e.length;n++)e[n].innerHTML=t[n];d(o,"start_element",1e3)},l=function(e){for(var t=new Array,n=0;n<e.length;n++)t[n]=n+1;i(t),d(e,"click_off",1e3),d(e,"hide_element",800,function(){s(e,"item__num-active-success"),s(e,"item__num-active-unsuccess");for(var n=0;n<e.length;n++)e[n].innerHTML=t[n];d(e,"start_element",1e3)})},u=function(e){var t=t||e;return function(n){var c=n||function(){};return 0===t&&(c(),t=e),t--}},d=function(e,t,n,c){for(var r=c||function(){},o=0;o<e.length;o++)e[o].classList.add(t);setTimeout(function(){r();for(var n=0;n<e.length;n++)e[n].classList.remove(t)},n)},m=function(e){for(var t=0,n=1,c=document.getElementsByClassName("item__num"),r=document.querySelector(".info_panel__container .score"),o=document.querySelector(".info_panel__container .timer"),i=function(t,c){var o=document.querySelector(".container__modal__end"),i=(document.querySelector("#restart_game"),document.querySelector("#result_game")),u=document.querySelector(".container");i.innerHTML="Ваш результат: "+t,s(o,"modal_hide"),u.classList.remove("modal-effect"),t=0,n=1,r.innerHTML="Score: "+t;for(var d=0;d<c.length;d++)c[d].classList.add("click_off");document.querySelector("#restart_game").addEventListener("click",function(){a(),m(e),o.classList.add("modal_hide"),u.classList.add("modal-effect"),l(c);for(var t=0;t<c.length;t++)c[t].classList.remove("click_off")})},_=u(e),f=function(){this.classList.add("item__num-active-success"),n++,t+=100},v=setInterval(function(){var e=_(function(){clearInterval(v),i(t,c)});o.innerHTML="Timer: "+e+"s"},1e3),L=function(){+this.textContent===n?f.call(this):this.classList.contains("item__num-active-success")||(this.classList.add("item__num-active-unsuccess"),d(c,"hide_element",800),l(c),n=1,t>=100?t-=100:t=0),n-1>=c.length&&(l(c),n=1),r.innerHTML="Score: "+t},h=0;h<c.length;h++){var g=L.bind(c[h]);c[h].addEventListener("click",g)}};!function(){var e=document.querySelector(".open_menu"),t=document.querySelector(".select_size_container"),n=document.querySelector(".btn_open_menu"),c=document.querySelectorAll(".select_size_container input");e.addEventListener("click",function(){for(var e=0;e<c.length;e++)c[e].classList.toggle("hide");t.classList.toggle("accent_bg"),n.classList.toggle("white_bg")})}(),document.querySelector("#start_game").addEventListener("click",function(){function e(){a(),m(45),t.removeEventListener("transitionend",e)}var t=document.querySelector(".container");document.querySelector(".container__modal__start").classList.add("modal_hide"),t.classList.add("modal-effect"),t.addEventListener("transitionend",e)})}],[2]);