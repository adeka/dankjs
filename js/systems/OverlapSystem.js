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

            if(!this.checkOverlap(entities, entity, overlap)) {
                overlap.overlappingEntity = null;
            }
        });
    }
    checkOverlap(entities, entity, overlap){
        return this.getEntitiesWithComponents(entities,
            Components.Overlap,
            Components.Input)
        .every((overlappingEntity) => {
            const overlapping = overlappingEntity.getComponent(Components.Overlap);

            const overlapResult =
                (overlappingEntity.id !== entity.id)
                && overlap.overlapsWith(overlapping.getHitbox());

            if(overlapResult) {
                overlapping.overlappingEntity = entity;
            }

            return overlapResult;
        })
    }
}
