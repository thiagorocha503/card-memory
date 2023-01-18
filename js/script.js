"use strict";
var IMAGE_ROOT = "img/";
window.addEventListener("load", function () {
    // img src
    var img = [
        IMAGE_ROOT + "javascript.png", IMAGE_ROOT + "javascript.png",
        IMAGE_ROOT + "css.png", IMAGE_ROOT + "css.png",
        IMAGE_ROOT + "html.png", IMAGE_ROOT + "html.png",
        IMAGE_ROOT + "bootstrap.png", IMAGE_ROOT + "bootstrap.png",
        IMAGE_ROOT + "react.png", IMAGE_ROOT + "react.png",
        IMAGE_ROOT + "typescript.png", IMAGE_ROOT + "typescript.png",
        IMAGE_ROOT + "sass.png", IMAGE_ROOT + "sass.png",
        IMAGE_ROOT + "jquery.png", IMAGE_ROOT + "jquery.png",
        IMAGE_ROOT + "npm.png", IMAGE_ROOT + "npm.png",
    ];
    // test 
    img = shuffle(img);
    // card
    var grid = document.getElementById("grid");
    var cards = Array();
    for (var i = 0; i < img.length; i++) {
        var cardWidget = buildCard(img[i], i);
        cards.push(new Card(cardWidget));
        grid.appendChild(cardWidget);
    }
    // Timer
    var display = document.getElementById("display");
    var timer = new Timer(display);
    // Sound
    var flip = document.getElementById("flip");
    var success = document.getElementById("success");
    var sound = new Sound(flip, success);
    // failuresCount
    var failuresDisplay = new Failures(document.getElementById("failures"));
    // button and control
    var btnSound = document.getElementById("btn-sound");
    var btnReset = document.getElementById("btn-reset");
    var control = new Control(btnSound, btnReset);
    // Game
    var game = new Game(cards, img, timer, sound, failuresDisplay, control);
});
var Card = /** @class */ (function () {
    function Card(element) {
        var _this = this;
        this._game = null;
        this._element = element;
        this._element.addEventListener("click", function () {
            var _a;
            (_a = _this._game) === null || _a === void 0 ? void 0 : _a.onClickCard(_this);
        });
    }
    Card.prototype.setGame = function (game) {
        this._game = game;
    };
    Card.prototype.flip = function () {
        this._element.classList.add("flip");
    };
    Card.prototype.unFlip = function () {
        this._element.classList.remove("flip");
    };
    Object.defineProperty(Card.prototype, "image", {
        get: function () {
            return this._element.getElementsByClassName("img-back")[0].getAttribute("src");
        },
        set: function (src) {
            this._element.getElementsByClassName("img-back")[0].setAttribute("src", src);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "id", {
        get: function () {
            return this._element.getAttribute("card-id");
        },
        enumerable: false,
        configurable: true
    });
    return Card;
}());
var Control = /** @class */ (function () {
    function Control(btnSoundEfect, btnReset) {
        var _this = this;
        this.soundEnable = true;
        this.game = null;
        btnSoundEfect.addEventListener("click", function () {
            var _a;
            console.log("sound button");
            if (!_this.soundEnable) {
                btnSoundEfect.innerHTML = '<i class="fas fa-volume-up fa-lg"></i>';
                _this.soundEnable = true;
            }
            else {
                _this.soundEnable = false;
                btnSoundEfect.innerHTML = '<i class="fas fa-volume-off fa-lg"></i>';
            }
            (_a = _this.game) === null || _a === void 0 ? void 0 : _a.onSoundEfect(_this.soundEnable);
        });
        btnReset.addEventListener("click", function () {
            var _a;
            (_a = _this.game) === null || _a === void 0 ? void 0 : _a.onReset();
        });
    }
    Control.prototype.setGame = function (game) {
        this.game = game;
    };
    return Control;
}());
var Failures = /** @class */ (function () {
    function Failures(failuresDisplay) {
        this.failuresDisplay = failuresDisplay;
    }
    Failures.prototype.setFailures = function (num) {
        this.failuresDisplay.innerHTML = "".concat(num);
    };
    return Failures;
}());
var CARD_FLIP_TRANSITION_TIME = 500;
var Game = /** @class */ (function () {
    function Game(cards, images, timer, sound, failuresDisplay, control) {
        this.turn = 1;
        this.cardOne = null;
        this.failures = 0;
        this.block = false;
        this.cardImagePair = [];
        this.cards = cards;
        this.images = shuffle(images);
        this.timer = timer;
        this.sound = sound;
        this.display = failuresDisplay;
        this.setEvents(control);
    }
    Game.prototype.setEvents = function (control) {
        control.setGame(this);
        // Add event listener
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].setGame(this);
        }
    };
    Game.prototype.onClickCard = function (otherCard) {
        var _this = this;
        if (this.block) {
            console.log("Blocked event");
            return;
        }
        if (this.cardImagePair.indexOf(otherCard.image) != -1) {
            console.log("Pair complete");
            return;
        }
        this.timer.start();
        this.block = true;
        if (this.turn == 1) {
            console.log("Turn: 1");
            this.cardOne = otherCard;
            this.sound.play(gameEfect.flip);
            otherCard.flip();
            setTimeout(function () {
                _this.block = false;
                _this.turn = 2;
            }, CARD_FLIP_TRANSITION_TIME);
        }
        else {
            console.log("Turn: 2");
            if (otherCard.id == this.cardOne.id) {
                console.log("Igual a carta anterior");
                this.block = false;
                return;
            }
            this.sound.play(gameEfect.flip);
            otherCard.flip();
            setTimeout(function () {
                var _a, _b, _c;
                if ((otherCard === null || otherCard === void 0 ? void 0 : otherCard.image) == ((_a = _this.cardOne) === null || _a === void 0 ? void 0 : _a.image)) {
                    console.log("Equal cards");
                    _this.sound.play(gameEfect.success);
                    _this.cardImagePair.push((_b = _this.cardOne) === null || _b === void 0 ? void 0 : _b.image);
                    _this.block = false;
                    _this.turn = 1;
                    if (_this.isEndGame()) {
                        console.log("End game");
                        _this.showEndGame();
                        return;
                    }
                }
                else {
                    console.log("Different cards");
                    _this.increaseFailures();
                    (_c = _this.cardOne) === null || _c === void 0 ? void 0 : _c.unFlip();
                    otherCard.unFlip();
                    setTimeout(function () {
                        _this.cardOne = null;
                        _this.block = false;
                        _this.turn = 1;
                    }, CARD_FLIP_TRANSITION_TIME);
                }
            }, CARD_FLIP_TRANSITION_TIME);
        }
    };
    Game.prototype.onReset = function () {
        var _this = this;
        this.timer.reset();
        this.resetFailures();
        this.block = true;
        if (this.cardImagePair.length < this.cards.length / 2) {
            this.showCards();
            this.sound.play(gameEfect.flip);
            setTimeout(function () {
                _this.hideCards();
                _this.sound.play(gameEfect.flip);
                setTimeout(function () {
                    // shuffle
                    _this.images = shuffle(_this.images);
                    for (var i = 0; i < _this.cards.length; i++) {
                        _this.cards[i].image = _this.images[i];
                    }
                    _this.block = false;
                    _this.cardImagePair = [];
                }, CARD_FLIP_TRANSITION_TIME);
            }, 800);
        }
        else {
            this.hideCards();
            this.sound.play(gameEfect.flip);
            setTimeout(function () {
                // shuffle
                _this.images = shuffle(_this.images);
                for (var i = 0; i < _this.cards.length; i++) {
                    _this.cards[i].image = _this.images[i];
                }
                _this.block = false;
                _this.cardImagePair = [];
            }, CARD_FLIP_TRANSITION_TIME);
        }
    };
    Game.prototype.onSoundEfect = function (enabled) {
        this.sound.setEnabledSoundEfect(enabled);
    };
    Game.prototype.resetFailures = function () {
        this.failures = 0;
        this.display.setFailures(this.failures);
    };
    Game.prototype.showEndGame = function () {
        var _this = this;
        this.timer.pause();
        console.log("Fim do jogo");
        Swal.fire({
            title: "Congratulations",
            text: "You won in ".concat(timeFormat(this.timer.getTime()), " with ").concat(this.failures, " failures"),
            icon: "success",
            allowOutsideClick: false,
            willClose: function () {
                _this.onReset();
            },
        });
    };
    Game.prototype.increaseFailures = function () {
        this.failures++;
        this.display.setFailures(this.failures);
    };
    Game.prototype.showCards = function () {
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].flip();
        }
    };
    Game.prototype.hideCards = function () {
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].unFlip();
        }
    };
    Game.prototype.isEndGame = function () {
        return this.cardImagePair.length == this.cards.length / 2;
    };
    return Game;
}());
// Enum sound game
var gameEfect;
(function (gameEfect) {
    gameEfect[gameEfect["flip"] = 0] = "flip";
    gameEfect[gameEfect["success"] = 1] = "success";
})(gameEfect || (gameEfect = {}));
var Sound = /** @class */ (function () {
    function Sound(flipCardSound, sucessSound) {
        this.enabledSoundEfects = true;
        this.flipCardSound = flipCardSound;
        this.sucessSound = sucessSound;
    }
    Sound.prototype.isEnabledSoundEfect = function () {
        return this.enabledSoundEfects;
    };
    Sound.prototype.setEnabledSoundEfect = function (enabled) {
        this.enabledSoundEfects = enabled;
    };
    Sound.prototype.play = function (option) {
        if (!this.enabledSoundEfects) {
            return;
        }
        var selectedSound;
        switch (option) {
            case gameEfect.flip:
                selectedSound = this.flipCardSound;
                break;
            case gameEfect.success:
                selectedSound = this.sucessSound;
                break;
            default:
                return;
        }
        selectedSound.currentTime = 0;
        selectedSound.play();
    };
    return Sound;
}());
var Timer = /** @class */ (function () {
    function Timer(display) {
        this.interval = NaN;
        this.time = 0;
        this.beforeTime = 0;
        this.display = display;
    }
    Timer.prototype.setTime = function (time) {
        this.time = time;
    };
    Timer.prototype.getTime = function () {
        return this.time;
    };
    Timer.prototype.start = function () {
        var _this = this;
        if (isNaN(this.interval)) {
            this.beforeTime = Date.now();
            this.interval = setInterval(function () { _this.clock(); }, 1000);
        }
    };
    Timer.prototype.clock = function () {
        var now = Date.now();
        var difference = now - this.beforeTime;
        var new_time = this.getTime() + difference;
        this.setTime(new_time);
        this.beforeTime = now;
        this.render();
    };
    Timer.prototype.render = function () {
        this.display.innerHTML = timeFormat(this.time);
    };
    Timer.prototype.pause = function () {
        clearInterval(this.interval);
        this.interval = NaN;
    };
    Timer.prototype.reset = function () {
        clearInterval(this.interval);
        this.interval = NaN;
        this.time = 0;
        this.render();
    };
    return Timer;
}());
var SECONDS = 1000;
var MINUTES = 60 * SECONDS;
var HOURS = 60 * MINUTES;
function buildCard(img, id) {
    var card = document.createElement("div");
    card.className = "card";
    card.setAttribute("card-id", id.toString());
    card.insertAdjacentHTML("afterbegin", "\n        <div class=\"front\">       \n            <img src=\"img/card-back.png\">\n        </div>\n        <div class=\"back\">\n            <div>\n                <img class=\"img-back\" src=".concat(img, ">\n            </div>         \n        </div>\n    "));
    return card;
}
function leftPad(value, lenght) {
    var s = value + "";
    while (s.length < lenght) {
        s = "0" + s;
    }
    ;
    return s;
}
function shuffle(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
}
function timeFormat(time) {
    var minutes = Math.floor((time % HOURS) / MINUTES);
    var seconds = Math.floor((time % MINUTES) / SECONDS);
    var str = leftPad(minutes, 2) + ":" + leftPad(seconds, 2);
    return str;
}
