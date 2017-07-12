const PIXI = require('pixi.js');
import * as Components from 'js/Components';
import System from 'js/systems/System';

export default class CollisionSystem extends System{
    constructor() {
        super();
    }
    update(entities) {
        this.getEntitiesWithComponents(entities,
            Components.Position,
            Components.Collider)
        .forEach((entity) => {
            const collider = entity.getComponent(Components.Collider);
            const position = entity.getComponent(Components.Position);
            const movement = entity.getComponent(Components.Movement);


            collider.collision = {
                top: false,
                left: false,
                right: false,
                bottom: false
            }

            if(collider.dynamic) {
                this.checkCollision(entities, entity, collider)
            }

            if(movement) {
                const newX = position.x + movement.velocity.x * movement.speed;
                const newY = position.y + movement.velocity.y * movement.speed;
                collider.setPosition(newX, newY);
            } else {
                collider.setPosition(
                    position.x,
                    position.y
                );
            }
        });
    }
    checkCollision(entities, entity, collider) {
        this.getEntitiesWithComponents(entities,
            Components.Collider)
        .forEach((collidingEntity) => {
            const colliding = collidingEntity.getComponent(Components.Collider);
            const col = (collidingEntity.id !== entity.id) && collider.collidesWith(colliding.getHitbox());
            if(col !== undefined) {
                collider.collision[col] = col;
            }
        });
    }
}
