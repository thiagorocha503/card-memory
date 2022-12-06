class Control {
    
    private soundEnable: boolean = true;
    private game: Game | null = null;

    constructor(btnSoundEfect: HTMLButtonElement, btnReset: HTMLButtonElement) {
        btnSoundEfect.addEventListener("click",() => {
            console.log("sound button")
            if (!this.soundEnable) {
                btnSoundEfect.innerHTML = '<i class="fas fa-volume-up fa-lg"></i>'
                this.soundEnable = false;
            } else {
                this.soundEnable =true;
                btnSoundEfect.innerHTML = '<i class="fas fa-volume-off fa-lg"></i>'
            }
            this.game?.onSoundEfect(this.soundEnable)         
        })
        btnReset.addEventListener("click",() => {
            this.game?.onReset();
        })
    }

    public setGame(game: Game){
        this.game = game;
    }
    
}