const PIXI = require('pixi.js');

export default class RendererComponent {
    constructor(args) {
        this.sprite = PIXI.Sprite.fromImage(`assets/${args.sprite}`);
        const anchor = args.anchor || { x: 0.5, y: 0.5};
        this.sprite.anchor.set(anchor.x, anchor.y);

        this.dynamic = Boolean(args.dynamic);

        if(args.size) {
            this.sprite.width = args.size.width;
            this.sprite.height = args.size.height;
        }

        if(args.scale) {
            this.sprite.scale.x = args.scale.x;
            this.sprite.scale.y = args.scale.y;
        }
    }
}
