const PIXI = require("pixi.js");
import * as Components from "js/Components";
import System from "js/systems/System";

export default class InputSystem extends System {
  constructor() {
    super();
  }
  update(entities) {
    this.getEntitiesWithComponents(
      entities,
      Components.Input,
      Components.Movement,
      Components.Collider,
      Components.Overlap,
      Components.Inventory
    ).forEach(entity => {
      const input = entity.getComponent(Components.Input);
      const movement = entity.getComponent(Components.Movement);
      const collider = entity.getComponent(Components.Collider);
      const overlap = entity.getComponent(Components.Overlap);
      const inventory = entity.getComponent(Components.Inventory);

      movement.setVelocity(
        input.getAxisValue("moveHorizontal"),
        input.getAxisValue("moveVertical")
      );

      input.onAction("use", () => {
        const overlapping = overlap.overlappingEntity;
        if (overlapping) {
          overlapping.getComponentsOfType(Components.Interact).forEach(component => {
            component.interact(overlapping, entity, entities);
          });
        }
      });
      input.onAction("inventory", () => {
        console.log(inventory);
      });

      input.onAction("attack", () => {
        console.log("attack");
      });
    });
  }
}
