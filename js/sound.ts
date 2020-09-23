// Enum sound game
enum gameEfect {
    flip,
    success,
}

class Sound {

    private enabledSoundEfects: boolean = true;
    private sucessSound: HTMLAudioElement;
    private flipCardSound: HTMLAudioElement;

    constructor(flipCardSound: HTMLAudioElement, sucessSound: HTMLAudioElement) {
        this.flipCardSound = flipCardSound;
        this.sucessSound = sucessSound;
    }

    isEnabledSoundEfect(): boolean {
        return this.enabledSoundEfects;
    }
    setEnabledSoundEfect(enabled: boolean): void {
        this.enabledSoundEfects = enabled;
    }

    play(option: gameEfect): void {
        if (!this.enabledSoundEfects) {
            return;
        }
        let selectedSound: HTMLAudioElement;
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
    }

}


