
const SECONDS: number = 1000;
const MINUTES: number = 60 * SECONDS;
const HOURS: number = 60 * MINUTES;

function buildCard(img: string,id: number) {
    let card: HTMLElement = document.createElement("div");
    card.className = "card";
    card.setAttribute("card-id", id.toString())
    card.insertAdjacentHTML("afterbegin",
        `
        <div class="front">       
            <img src="img/card-back.png">
        </div>
        <div class="back">
            <div>
                <img class="img-back" src=${img}>
            </div>         
        </div>
    `
    );
    return card;
}

function leftPad(value: number, lenght: number) {
    let s = value + "";
    while (s.length < lenght){
        s = "0" + s
    };
    return s;
}

function shuffle(array: Array<any>): Array<any> {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function timeFormat(time:number){
    let minutes = Math.floor((time % HOURS) / MINUTES);
    let seconds = Math.floor((time % MINUTES) / SECONDS);
    let str = leftPad(minutes, 2) + ":" + leftPad(seconds, 2);
    return str;
}