

class Card{

    private _element: HTMLElement;
    private _game: Game | null = null;

    constructor(element: HTMLElement){
        this._element = element;
        this._element.addEventListener("click",() => {
            this._game?.onClickCard(this);
        });
        
    }

    public setGame(game: Game){
        this._game = game;
    }

    public flip(){
        this._element.classList.add("flip")
    }

    public unFlip(){
        this._element.classList.remove("flip")
    }

    get image(): string {
        return this._element.getElementsByClassName("img-back")[0].getAttribute("src")!
    }

    set image(src: string) {
        this._element.getElementsByClassName("img-back")[0].setAttribute("src", src)
    }

    get id() {
        return this._element.getAttribute("card-id");
    }


}