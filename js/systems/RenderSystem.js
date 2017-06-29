const PIXI = require('pixi.js');
import * as Components from 'js/Components';
import System from 'js/systems/System';

export default class RenderSystem extends System{
    constructor() {
        super();
        this.renderer = new PIXI.WebGLRenderer(300, 300);
        this.stage = new PIXI.Container();
        document.body.appendChild(this.renderer.view);
    }
    update(entities) {
        this.renderer.render(this.stage);
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
        });
    }
}
