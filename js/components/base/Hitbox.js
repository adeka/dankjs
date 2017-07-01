import Bump from 'bump.js';
const PIXI = require('pixi.js');

export default class Hitbox {
    rect = {};
    constructor() {
        this.bump = new Bump(PIXI);
    }
    getRect(width, height) {
        return {
            x: 0,
            y: 0,
            width: width,
            height: height,
            getGlobalPosition: () => {
                return { x: this.rect.x, y: this.rect.y }
            }
        };
    }
    setPosition(x,y) {
        this.rect.x = x - this.rect.width / 2;
        this.rect.y = y - this.rect.height / 2;
    }
    getHitbox() {
        return this.rect;
    }
}
