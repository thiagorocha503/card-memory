

class Failures {

    private failuresDisplay: HTMLSpanElement;

    constructor(failuresDisplay: HTMLSpanElement){
        this.failuresDisplay = failuresDisplay
    }

    public setFailures(num: number){
        this.failuresDisplay.innerHTML = `${num}` ;
    }

}