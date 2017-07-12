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
            if(overlap.dynamic && !this.checkOverlap(entities, entity, overlap)) {
                overlap.overlappingEntity = null;
            }
        });
    }
    checkOverlap(entities, entity, overlap){
        return this.getEntitiesWithComponents(entities,
            Components.Overlap)
        .reduce((sum, overlappingEntity) => {
            let overlapResult = false;
            if(overlappingEntity.id !== entity.id) {
                const overlapping = overlappingEntity.getComponent(Components.Overlap);
                overlapResult = overlap.overlapsWith(overlapping.getHitbox());
                if(overlapResult) {
                    overlap.overlappingEntity = overlappingEntity;
                }
            }
            return sum || overlapResult;
        }, false)
    }
}
