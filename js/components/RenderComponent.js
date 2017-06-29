const PIXI = require('pixi.js');

export default class RendererComponent {
    constructor(args) {
        this.sprite = PIXI.Sprite.fromImage(`assets/${args.sprite}`);

        const anchor = args.anchor || { x: 0.5, y: 0.5};
        this.sprite.anchor.set(anchor.x, anchor.y);
    }
}
