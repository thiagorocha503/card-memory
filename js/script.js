"use strict";var gameEfect,IMAGE_ROOT="img/";window.addEventListener("load",function(){var t=[IMAGE_ROOT+"javascript.png",IMAGE_ROOT+"javascript.png",IMAGE_ROOT+"css.png",IMAGE_ROOT+"css.png",IMAGE_ROOT+"html.png",IMAGE_ROOT+"html.png",IMAGE_ROOT+"bootstrap.png",IMAGE_ROOT+"bootstrap.png",IMAGE_ROOT+"react.png",IMAGE_ROOT+"react.png",IMAGE_ROOT+"typescript.png",IMAGE_ROOT+"typescript.png",IMAGE_ROOT+"sass.png",IMAGE_ROOT+"sass.png",IMAGE_ROOT+"jquery.png",IMAGE_ROOT+"jquery.png",IMAGE_ROOT+"npm.png",IMAGE_ROOT+"npm.png",];t=shuffle(t);for(var e=document.getElementById("grid"),i=[],n=0;n<t.length;n++){var s=buildCard(t[n],n);i.push(new Card(s)),e.appendChild(s)}var r=document.getElementById("display"),a=new Timer(r),o=document.getElementById("flip"),l=document.getElementById("success"),c=new Sound(o,l),u=new Failures(document.getElementById("failures")),f=document.getElementById("btn-sound"),d=document.getElementById("btn-reset"),h=new Control(f,d);new Game(i,t,a,c,u,h)});var Card=function(){function t(t){var e=this;this._game=null,this._element=t,this._element.addEventListener("click",function(){var t;null===(t=e._game)||void 0===t||t.onClickCard(e)})}return t.prototype.setGame=function(t){this._game=t},t.prototype.flip=function(){this._element.classList.add("flip")},t.prototype.unFlip=function(){this._element.classList.remove("flip")},Object.defineProperty(t.prototype,"image",{get:function(){return this._element.getElementsByClassName("img-back")[0].getAttribute("src")},set:function(t){this._element.getElementsByClassName("img-back")[0].setAttribute("src",t)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"id",{get:function(){return this._element.getAttribute("card-id")},enumerable:!1,configurable:!0}),t}(),Control=function(){function t(t,e){var i=this;this.soundEnable=!0,this.game=null,t.addEventListener("click",function(){var e;i.soundEnable?(i.soundEnable=!1,t.innerHTML='<i class="fas fa-volume-off fa-lg"></i>'):(t.innerHTML='<i class="fas fa-volume-up fa-lg"></i>',i.soundEnable=!0),null===(e=i.game)||void 0===e||e.onSoundEfect(i.soundEnable)}),e.addEventListener("click",function(){var t;null===(t=i.game)||void 0===t||t.onReset()})}return t.prototype.setGame=function(t){this.game=t},t}(),Failures=function(){function t(t){this.failuresDisplay=t}return t.prototype.setFailures=function(t){this.failuresDisplay.innerHTML="".concat(t)},t}(),CARD_FLIP_TRANSITION_TIME=500,Game=function(){function t(t,e,i,n,s,r){this.turn=1,this.cardOne=null,this.failures=0,this.block=!1,this.cardImagePair=[],this.cards=t,this.images=shuffle(e),this.timer=i,this.sound=n,this.display=s,this.setEvents(r)}return t.prototype.setEvents=function(t){t.setGame(this);for(var e=0;e<this.cards.length;e++)this.cards[e].setGame(this)},t.prototype.onClickCard=function(t){var e=this;if(!this.block&&-1==this.cardImagePair.indexOf(t.image)){if(this.timer.start(),this.block=!0,1==this.turn)this.cardOne=t,this.sound.play(gameEfect.flip),t.flip(),setTimeout(function(){e.block=!1,e.turn=2},CARD_FLIP_TRANSITION_TIME);else{if(t.id==this.cardOne.id){this.block=!1;return}this.sound.play(gameEfect.flip),t.flip(),setTimeout(function(){var i,n,s;if((null==t?void 0:t.image)==(null===(i=e.cardOne)||void 0===i?void 0:i.image)){if(e.sound.play(gameEfect.success),e.cardImagePair.push(null===(n=e.cardOne)||void 0===n?void 0:n.image),e.block=!1,e.turn=1,e.isEndGame()){e.showEndGame();return}}else e.increaseFailures(),null===(s=e.cardOne)||void 0===s||s.unFlip(),t.unFlip(),setTimeout(function(){e.cardOne=null,e.block=!1,e.turn=1},CARD_FLIP_TRANSITION_TIME)},CARD_FLIP_TRANSITION_TIME)}}},t.prototype.onReset=function(){var t=this;this.timer.reset(),this.resetFailures(),this.block=!0,this.cardImagePair.length<this.cards.length/2?(this.showCards(),this.sound.play(gameEfect.flip),setTimeout(function(){t.hideCards(),t.sound.play(gameEfect.flip),setTimeout(function(){t.images=shuffle(t.images);for(var e=0;e<t.cards.length;e++)t.cards[e].image=t.images[e];t.block=!1,t.cardImagePair=[]},CARD_FLIP_TRANSITION_TIME)},800)):(this.hideCards(),this.sound.play(gameEfect.flip),setTimeout(function(){t.images=shuffle(t.images);for(var e=0;e<t.cards.length;e++)t.cards[e].image=t.images[e];t.block=!1,t.cardImagePair=[]},CARD_FLIP_TRANSITION_TIME))},t.prototype.onSoundEfect=function(t){this.sound.setEnabledSoundEfect(t)},t.prototype.resetFailures=function(){this.failures=0,this.display.setFailures(this.failures)},t.prototype.showEndGame=function(){var t=this;this.timer.pause(),Swal.fire({title:"Congratulations",text:"You won in ".concat(timeFormat(this.timer.getTime())," with ").concat(this.failures," failures"),icon:"success",allowOutsideClick:!1,willClose:function(){t.onReset()}})},t.prototype.increaseFailures=function(){this.failures++,this.display.setFailures(this.failures)},t.prototype.showCards=function(){for(var t=0;t<this.cards.length;t++)this.cards[t].flip()},t.prototype.hideCards=function(){for(var t=0;t<this.cards.length;t++)this.cards[t].unFlip()},t.prototype.isEndGame=function(){return this.cardImagePair.length==this.cards.length/2},t}();!function(t){t[t.flip=0]="flip",t[t.success=1]="success"}(gameEfect||(gameEfect={}));var Sound=function(){function t(t,e){this.enabledSoundEfects=!0,this.flipCardSound=t,this.sucessSound=e}return t.prototype.isEnabledSoundEfect=function(){return this.enabledSoundEfects},t.prototype.setEnabledSoundEfect=function(t){this.enabledSoundEfects=t},t.prototype.play=function(t){var e;if(this.enabledSoundEfects){switch(t){case gameEfect.flip:e=this.flipCardSound;break;case gameEfect.success:e=this.sucessSound;break;default:return}e.currentTime=0,e.play()}},t}(),Timer=function(){function t(t){this.interval=NaN,this.time=0,this.beforeTime=0,this.display=t}return t.prototype.setTime=function(t){this.time=t},t.prototype.getTime=function(){return this.time},t.prototype.start=function(){var t=this;isNaN(this.interval)&&(this.beforeTime=Date.now(),this.interval=setInterval(function(){t.clock()},1e3))},t.prototype.clock=function(){var t=Date.now(),e=t-this.beforeTime,i=this.getTime()+e;this.setTime(i),this.beforeTime=t,this.render()},t.prototype.render=function(){this.display.innerHTML=timeFormat(this.time)},t.prototype.pause=function(){clearInterval(this.interval),this.interval=NaN},t.prototype.reset=function(){clearInterval(this.interval),this.interval=NaN,this.time=0,this.render()},t}(),SECONDS=1e3,MINUTES=60*SECONDS,HOURS=60*MINUTES;function buildCard(t,e){var i=document.createElement("div");return i.className="card",i.setAttribute("card-id",e.toString()),i.insertAdjacentHTML("afterbegin",'\n<div class="front">\n<img src="img/card-back.png">\n</div>\n<div class="back">\n<div>\n<img class="img-back" src='.concat(t,">\n</div>\n</div>\n")),i}function leftPad(t,e){for(var i=t+"";i.length<e;)i="0"+i;return i}function shuffle(t){for(var e,i=t.length-1;i>0;i--){var n=Math.floor(Math.random()*(i+1));e=[t[n],t[i]],t[i]=e[0],t[n]=e[1]}return t}function timeFormat(t){return leftPad(Math.floor(t%HOURS/MINUTES),2)+":"+leftPad(Math.floor(t%MINUTES/SECONDS),2)}