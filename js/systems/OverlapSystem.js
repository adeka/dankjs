const PIXI = require('pixi.js');
import * as Components from 'js/Components';
import System from 'js/systems/System';

export default class OverlapSystem extends System{
    constructor() {
        super();
    }
    update(entities) {
        this.getEntitiesWithComponents(entities,
            Components.Position,
            Components.Overlap)
        .forEach((entity) => {
            const position = entity.getComponent(Components.Position);
            const overlap = entity.getComponent(Components.Overlap);

            overlap.setPosition(
                position.x,
                position.y
            );

        });
    }
}
