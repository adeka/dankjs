const PIXI = require('pixi.js');
import * as Components from 'js/Components';
import System from 'js/systems/System';

export default class BotSystem extends System{
    constructor() {
        super();
    }
    update(entities) {
        this.getEntitiesWithComponents(entities,
            Components.Movement,
            Components.Bot,
            Components.Collider)
        .forEach((entity) => {
            const movement = entity.getComponent(Components.Movement);
            const collision = entity.getComponent(Components.Collider);
            const bot = entity.getComponent(Components.Bot);

            bot.tick();
            if(bot.time > 100) {
                movement.setVelocity(-1,0);
            }
        });
    }
}
