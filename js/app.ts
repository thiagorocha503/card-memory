const IMAGE_ROOT = "img/";

window.addEventListener("load", function () {
    // img src
    let img: Array<string> = [
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
    let grid: HTMLElement = document.getElementById("grid") as HTMLElement;
    let cards: Array<Card> = Array();
    for(let i=0;i<img.length;i++) {
        let cardWidget = buildCard(img[i], i);
        cards.push(new Card(cardWidget))
        grid.appendChild(cardWidget);
    }
    // Timer
    let display: HTMLSpanElement = document.getElementById("display") as HTMLSpanElement;
    let timer: Timer = new Timer(display);
    // Sound
    let flip: HTMLAudioElement = document.getElementById("flip") as HTMLAudioElement;
    let success: HTMLAudioElement = document.getElementById("success") as HTMLAudioElement;
    let sound = new Sound(flip, success);
    // failuresCount
    let failuresDisplay = new Failures(document.getElementById("failures") as HTMLSpanElement);
    // button and control
    let btnSound: HTMLButtonElement = document.getElementById("btn-sound") as HTMLButtonElement;
    let btnReset: HTMLButtonElement = document.getElementById("btn-reset") as HTMLButtonElement;
    let control: Control = new Control(btnSound, btnReset);
    // Game
    let game: Game = new Game(cards, img, timer, sound, failuresDisplay, control);
});
