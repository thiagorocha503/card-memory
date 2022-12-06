declare var Swal: any;
const CARD_FLIP_TRANSITION_TIME: number = 800;


class Game {
    private cards: Array<Card>;
    private images: Array<string>;
    private turn: number = 1;
    private card1: Card | null = null;
    private card2: Card | null = null;
    private timer: Timer;
    private sound: Sound;
    private failures: number = 0;
    private display: Failures;
    
    constructor(cards: Array<Card>, images: Array<string>, timer: Timer, sound: Sound, failuresDisplay: Failures, control: Control) {
        this.cards = cards;
        this.images = shuffle(images);
        this.timer = timer;
        this.sound = sound;
        this.display = failuresDisplay;
        this.setEvents(control);
        // for (let i = 0; i < this.cards.length; i++) {
        //     this.cards[i].classList.remove("block");
        //     this.cards[i].getElementsByClassName("img-back")[0].setAttribute("src", this.images[i]);
        // }
    }

    private setEvents(control: Control ): void {
        control.setGame(this)
        // Add event listener      
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].setGame(this);
        }
    }

    public onClickCard(card: Card): void {
        if (this.isEndGame()) {
            console.log("End game");
            return;
        }
        this.timer.start();
        if (this.isCardBlocked(card)) {
            console.log("> Carta já retirada");
            return;
        }

        if (this.isSelectedCard(card)) {
            console.log("> carta já selecionado")
            return;
        }
        // flip card
        card.flip();
        this.sound.play(gameEfect.flip);
       
        // wait card flip
        setTimeout( () =>{
            if (this.turn == 1) {
                this.card1 = card;
                this.turn = 2;
                console.log("> turn 1")
            } else {
                console.log("> turn 2")
                this.card2 = card;
                this.turn = 1;
                if (this.card1?.getImage() == this.card2.getImage()) {
                    console.log("> imagens iguais")
                    this.card1?.block(true);
                    this.card2?.block(true);
                    this.sound.play(gameEfect.success);
                } else {
                    console.log("> imagens diferente");
                    this.sound.play(gameEfect.flip);
                    this.card1?.unFlip()
                    this.card2?.unFlip();
                    this.increaseFailures();
                }
                this.card2 = null;
                this.card1 = null;
                if (this.isEndGame()) {
                    this.timer.pause();
                    console.log("Fim do jogo");
                    Swal.fire(
                        {
                            "title": "Congratulations",
                            "text": `You won in ${timeFormat(this.timer.getTime())} with ${this.failures} failures`,
                            "icon": "success",
                            "allowOutsideClick": false,
                            "willClose":  () => {
                                this.restart();
                            }
                        }
                    );
                }
            }
        }, CARD_FLIP_TRANSITION_TIME);

    }

    public restart() {
        this.shuffle();
    }

    public onReset(): void {
        this.sound.play(gameEfect.flip);
        this.showCards();
        this.shuffle();
    }

    public onSoundEfect(enabled: boolean): void {
        this.sound.setEnabledSoundEfect(!enabled);  
    }

    private isSelectedCard(card: Card): boolean {      
        return this.card1?.equals(card)!;
    }

    private isCardBlocked(card: Card): boolean {
        return card.isBlocked();
    }

    private resetFailures(): void {
        this.failures = 0;
        this.display.setFailures(this.failures)
    }

    private increaseFailures(): void {
        this.failures++;
        this.display.setFailures(this.failures)
    }

    private showCards(): void {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].flip()
        }
    }

    private hideCards(): void {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].unFlip()
        }
    }

    private shuffle(): void {
        this.timer.reset();
        this.resetFailures();
        setTimeout(() => {
            this.sound.play(gameEfect.flip);
            this.hideCards();
            setTimeout(() => {
                this.images = shuffle(this.images);
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].block(false);
                    this.cards[i].setImage(this.images[i]);
                    
                }
                // this.showCards();/* for test*/
            }, CARD_FLIP_TRANSITION_TIME );
        },CARD_FLIP_TRANSITION_TIME);
    }

    private isEndGame(): boolean {
        for (let i = 0; i < this.cards.length; i++) {
            if (!this.cards[i].isBlocked()) {
                return false;
            }
        }
        return true;
    }

}