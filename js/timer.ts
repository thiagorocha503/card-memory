
class Timer {
    
    private interval: number;
    private time: number;
    private display: HTMLSpanElement;
    private beforeTime: number;

    constructor(display: HTMLSpanElement) {
        this.interval = NaN;
        this.time = 0;
        this.beforeTime = 0;
        this.display = display;
    }

    private setTime(time: number) {
        this.time = time;
    }

    public getTime(): number {
        return this.time;
    }

    public start() {
        if (isNaN(this.interval)) {
            this.beforeTime = Date.now();
            this.interval = setInterval(()=>{this.clock()}, 1000);
        }
    }

    private clock(){       
        let now = Date.now();
        let difference = now - this.beforeTime;
        let new_time = this.getTime() + difference;
        this.setTime(new_time);
        this.beforeTime = now;
        this.render();
    }

    private render() {
        this.display.innerHTML = timeFormat(this.time);
    }

    public pause() {
        clearInterval(this.interval);
        this.interval = NaN;
    }

    public reset() {
        clearInterval(this.interval);
        this.interval = NaN;
        this.time = 0;
        this.render()
    }
}