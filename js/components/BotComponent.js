export default class BotComponent {
    constructor(args) {
        this.time = 0;
    }
    tick() {
        this.time++;
    }
    resetTick() {
        this.time = 0;
    }

}
