const PIXI = require('pixi.js');
import InteractComponent from 'js/components/base/InteractComponent';
import * as Components from 'js/Components';
import GameManager from 'js/GameManager';

export default class PickupComponent extends InteractComponent {
    constructor(args) {
        super();
    }
    interact(thisEntity, otherEntity, allEntities) {
        otherEntity.getComponent(Components.Inventory).items.push(thisEntity);
        GameManager.removeEntity(thisEntity);
    }
}
