const PIXI = require("pixi.js");
import * as Components from "js/Components";
import System from "js/systems/System";

export default class CollisionSystem extends System {
  constructor() {
    super();
  }
  update(entities) {
    this.getEntitiesWithComponents(
      entities,
      Components.Position,
      Components.Collider
    ).forEach(entity => {
      const collider = entity.getComponent(Components.Collider);
      const position = entity.getComponent(Components.Position);

      collider.setPosition(position.x, position.y);
      collider.collision = {
        top: false,
        left: false,
        right: false,
        bottom: false
      };

      this.getEntitiesWithComponents(entities, Components.Collider).forEach(collidingEntity => {
        const colliding = collidingEntity.getComponent(Components.Collider);
        const col =
          collidingEntity.id !== entity.id && collider.collidesWith(colliding.getHitbox());
        if (col) {
          collider.collision[col] = col;
        }
      });
    });
  }
}
