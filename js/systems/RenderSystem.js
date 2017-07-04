const PIXI = require('pixi.js');
import * as Components from 'js/Components';
import System from 'js/systems/System';

export default class RenderSystem extends System{
    constructor() {
        super();
        this.renderer = new PIXI.WebGLRenderer(500, 500);
        this.stage = new PIXI.Container();
        this.graphics = new PIXI.Graphics();
        this.stage.addChild(this.graphics);

        document.getElementsByClassName('game')[0].appendChild(this.renderer.view);
    }
    update(entities) {

        this.renderer.render(this.stage);
        this.stage.removeChildren();
        this.stage.addChild(this.graphics);
        this.graphics.clear();

        this.getEntitiesWithComponents(entities,
            Components.Renderer,
            Components.Position)
        .forEach((entity) => {
            const renderer = entity.getComponent(Components.Renderer);
            const position = entity.getComponent(Components.Position);

            const sprite = renderer.sprite;
            sprite.x = position.x;
            sprite.y = position.y;
            this.stage.addChild(sprite);


            const collider = entity.getComponent(Components.Collider);
            if(collider) {
                const hitbox = collider.getHitbox();
                // debug
                this.graphics.lineStyle(1, 0xFF3300, 1);
                this.graphics.drawRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
            }

            const overlap = entity.getComponent(Components.Overlap);
            if(overlap) {
                const hitbox = overlap.getHitbox();
                // debug
                this.graphics.lineStyle(1, 0x00FFFF, 1);
                this.graphics.drawRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
            }
        });
    }
}
