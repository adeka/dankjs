const PIXI = require('pixi.js');
import * as Components from 'js/Components';
import System from 'js/systems/System';

export default class MovementSystem extends System{
    constructor() {
        super();
    }
    update(entities) {
        this.getEntitiesWithComponents(entities,
            Components.Movement,
            Components.Position)
        .forEach((entity) => {
            const movement = entity.getComponent(Components.Movement);
            const position = entity.getComponent(Components.Position);
            position.x += (movement.velocity.x * movement.speed);
            position.y += (movement.velocity.y * movement.speed);
        });
    }
}
