

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

    public getImage (): string {
        return this._element.getElementsByClassName("img-back")[0].getAttribute("src")!
    }

    public setImage (src: string) {
        this._element.getElementsByClassName("img-back")[0].setAttribute("src", src)
    }
    public isBlocked(): boolean{
        return this._element.classList.contains("block");
    }

    public block(block: boolean){
        if(block){
            this._element.classList.add("block");
        } else{
            this._element.classList.remove("block");

        }
    }

    public getId(){
        return this._element.getAttribute("card-id");
    }

    public equals(card: Card): boolean {
        return this.getId() == card.getId()
    }

}