declare var Swal: any;
const CARD_FLIP_TRANSITION_TIME: number = 500;

class Game {
    private cards: Array<Card>;
    private images: Array<string>;
    private turn: number = 1;
    private cardOne: Card | null = null;
    private timer: Timer;
    private sound: Sound;
    private failures: number = 0;
    private display: Failures;
    private block: boolean = false;
    private cardImagePair: Array<string> = [];

    constructor(
        cards: Array<Card>,
        images: Array<string>,
        timer: Timer,
        sound: Sound,
        failuresDisplay: Failures,
        control: Control
    ) {
        this.cards = cards;
        this.images = shuffle(images);
        this.timer = timer;
        this.sound = sound;
        this.display = failuresDisplay;
        this.setEvents(control);
    }

    private setEvents(control: Control): void {
        control.setGame(this);
        // Add event listener
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].setGame(this);
        }
    }

    public onClickCard(otherCard: Card): void {
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
            setTimeout(() => {
                this.block = false;
                this.turn = 2;
            }, CARD_FLIP_TRANSITION_TIME);
        } else {
            console.log("Turn: 2");

            if (otherCard.id == this.cardOne!.id) {
                console.log("Igual a carta anterior");
                this.block = false;
                return;
            }
            this.sound.play(gameEfect.flip);
            otherCard.flip();
            setTimeout(() => {
                if (otherCard?.image == this.cardOne?.image) {
                    console.log("Equal cards");
                    this.sound.play(gameEfect.success);
                    this.cardImagePair.push(this.cardOne?.image!);
                    this.block = false;
                    this.turn = 1;
                    if (this.isEndGame()) {
                        console.log("End game");
                        this.showEndGame();
                        return;
                    }
                } else {
                    console.log("Different cards");
                    this.increaseFailures();
                    this.cardOne?.unFlip();
                    otherCard.unFlip();
                    setTimeout(() => {
                        this.cardOne = null;
                        this.block = false;
                        this.turn = 1;
                    }, CARD_FLIP_TRANSITION_TIME);
                }
            }, CARD_FLIP_TRANSITION_TIME);
        }
    }

    public onReset() {
        this.timer.reset();
        this.resetFailures();
        this.block = true;
        if (this.cardImagePair.length < this.cards.length / 2) {
            this.showCards();
            this.sound.play(gameEfect.flip);
            setTimeout(() => {
                this.hideCards();
                this.sound.play(gameEfect.flip);
                setTimeout(() => {
                    // shuffle
                    this.images = shuffle(this.images);
                    for (let i = 0; i < this.cards.length; i++) {
                        this.cards[i].image = this.images[i];
                    }
                    this.block = false;
					this.cardImagePair = []; 
                }, CARD_FLIP_TRANSITION_TIME);
            }, 800);
        } else {
            this.hideCards();
            this.sound.play(gameEfect.flip);
            setTimeout(() => {
                // shuffle
                this.images = shuffle(this.images);
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].image = this.images[i];
                }
                this.block = false;
				this.cardImagePair = []; 
            }, CARD_FLIP_TRANSITION_TIME);
        }
    }

    public onSoundEfect(enabled: boolean): void {
        this.sound.setEnabledSoundEfect(enabled);
    }

    private resetFailures(): void {
        this.failures = 0;
        this.display.setFailures(this.failures);
    }

    private showEndGame() {
        this.timer.pause();
        console.log("Fim do jogo");
        Swal.fire({
            title: "Congratulations",
            text: `You won in ${timeFormat(this.timer.getTime())} with ${
                this.failures
            } failures`,
            icon: "success",
            allowOutsideClick: false,
            willClose: () => {
                this.onReset();
            },
        });
    }

    private increaseFailures(): void {
        this.failures++;
        this.display.setFailures(this.failures);
    }

    private showCards(): void {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].flip();
        }
    }

    private hideCards(): void {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].unFlip();
        }
    }

    private isEndGame(): boolean {
        return this.cardImagePair.length == this.cards.length / 2;
    }
}
