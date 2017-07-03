const PIXI = require('pixi.js');
import * as Components from 'js/Components';
import System from 'js/systems/System';
import Interface from 'ui/Interface';

export default class InterfaceSystem extends System{
    constructor() {
        super();
    }
    update(entities) {
        this.getEntitiesWithComponents(entities,
            Components.Input,
            Components.Movement,
            Components.Collider,
            Components.Overlap,
            Components.Inventory)
        .forEach((entity) => {
            const input = entity.getComponent(Components.Input);
            const movement = entity.getComponent(Components.Movement);
            const collider = entity.getComponent(Components.Collider);
            const overlap = entity.getComponent(Components.Overlap);
            const inventory = entity.getComponent(Components.Inventory);

            Interface.store.items = inventory.items;
            this.updateUseIndicator(overlap)
        });
    }
    updateUseIndicator(overlap) {
        if(overlap.overlappingEntity) {
            const overlapPosition = overlap.overlappingEntity.getComponent(Components.Position);
            const overlapping = overlap.overlappingEntity.getComponent(Components.Overlap);
            const overlapInfo = overlap.overlappingEntity.getComponent(Components.Info);

            const x = overlapPosition.x;
            const y = overlapPosition.y;
            const height = overlapping.getHitbox().height / 2;
            Interface.store.useIndicator = {x: x, y: y - height, info: overlapInfo};
        } else {
            Interface.store.useIndicator = null;
        }
    }
}
