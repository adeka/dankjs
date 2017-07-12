const PIXI = require('pixi.js');
import * as Components from 'js/Components';
import System from 'js/systems/System';
import GameManager from 'js/GameManager';

export default class RenderSystem extends System{
    constructor() {
        super();
        this.zoomScale = 1;
        this.renderer = new PIXI.WebGLRenderer(750, 750);
        this.renderer.backgroundColor = 0x204253;
        this.stage = new PIXI.Container();
        this.map = new PIXI.Container();
        this.graphics = new PIXI.Graphics();

        // this.stage.scale.x = .058;
        // this.stage.scale.y = .058;

        this.stage.scale.x = this.zoomScale;
        this.stage.scale.y = this.zoomScale;

        // GameManager.map.tiles.forEach((tile) => {
        //     this.map.addChild(tile);
        // });

        document.getElementsByClassName('game')[0].appendChild(this.renderer.view);
    }
    update(entities) {
        this.renderer.render(this.stage);
        this.graphics.clear();
        this.stage.removeChildren();

        this.updateCamera(entities);

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
        this.stage.addChild(this.graphics);

    }
    updateCamera(entities) {
        const map = GameManager.map;
        this.getEntitiesWithComponents(entities, Components.Input, Components.Position)
        .forEach((entity) => {
            const position = entity.getComponent(Components.Position);
            const screenHalfWidth = (this.renderer.width / 2) * this.zoomScale;
            const screenHalfHeight = (this.renderer.height / 2) * this.zoomScale;
            const center = { x: screenHalfWidth, y: screenHalfHeight };
            const x = Math.max(-1 * map.mapWidth * map.tileSize + screenHalfWidth * 2, Math.min(center.x - position.x, 0));
            const y = Math.max(-1 * map.mapWidth * map.tileSize + screenHalfHeight * 2, Math.min(center.y - position.y, 0));
            this.stage.x = x;
            this.stage.y = y;
        });
    }
}
