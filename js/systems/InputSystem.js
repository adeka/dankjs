const PIXI = require('pixi.js');
import * as Components from 'js/Components';
import System from 'js/systems/System';

export default class InputSystem extends System{
    constructor() {
        super();
    }
    update(entities) {
        this.getEntitiesWithComponents(entities,
            Components.Input,
            Components.Movement)
        .forEach((entity) => {
            const input = entity.getComponent(Components.Input);
            const movement = entity.getComponent(Components.Movement);
            movement.velocity = {
                x: input.getAxisValue('moveHorizontal'),
                y: input.getAxisValue('moveVertical')
            };
            input.onAction('use', () => {
                console.log('pressed the use button!');
            });
            input.onAction('attack', () => {
                console.log('attacking?!');
            });
        });
    }
}
