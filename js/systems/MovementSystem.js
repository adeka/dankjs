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
            Components.Position,
            Components.Collider)
        .forEach((entity) => {
            const movement = entity.getComponent(Components.Movement);
            const position = entity.getComponent(Components.Position);
            const collider = entity.getComponent(Components.Collider);

            const collision = collider.collision;
            const newX = position.x + (movement.velocity.x * movement.speed);
            const newY = position.y + (movement.velocity.y * movement.speed);

            if(!collision.right && newX > position.x) {
                position.x = newX;
            }
            if(!collision.left && newX < position.x) {
                position.x = newX;
            }
            if(!collision.top && newY < position.y) {
                position.y = newY;
            }
            if(!collision.bottom && newY > position.y) {
                position.y = newY;
            }

        });
    }
}
