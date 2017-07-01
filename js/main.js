const PIXI = require('pixi.js');
import Entity from 'js/Entity';
import RenderSystem from 'js/systems/RenderSystem';
import MovementSystem from 'js/systems/MovementSystem';
import InputSystem from 'js/systems/InputSystem';
import CollisionSystem from 'js/systems/CollisionSystem';
import OverlapSystem from 'js/systems/OverlapSystem';
import BotSystem from 'js/systems/BotSystem';

let entities = [];
const ent = new Entity({
    Renderer: {
        sprite: 'sunset.png'
    },
    Position: {
        x: 30,
        y: 30
    },
    Inventory: {

    },
    Input: {
        axes: {
            moveVertical: {
                min: 'w',
                max: 's'
            },
            moveHorizontal: {
                min: 'a',
                max: 'd'
            }
        },
        actions: {
            use: 'e',
            attack: 'r t g'
        }
    },
    Movement: {
        speed: 3
    },
    Collider: {
        width: 50,
        height: 50
    }
});

const ent2 = new Entity({
    Renderer: {
        sprite: 'plain.png'
    },
    Position: {
        x: 80,
        y: 80
    },
    Movement: {
        speed: 1
    },
    Collider: {
        width: 50,
        height: 50
    },
    Bot: {

    }
});

const ent3 = new Entity({
    Renderer: {
        sprite: 'fire.png'
    },
    Position: {
        x: 200,
        y: 180
    },
    Collider: {
        width: 100,
        height: 60
    },
    Overlap: {
        width: 150,
        height: 110
    }
});

const item = new Entity({
    Renderer: {
        sprite: 'scroll.png'
    },
    Position: {
        x: 275,
        y: 225
    },
    Overlap: {
        width: 50,
        height: 50,
    }
});
entities.push(ent);
entities.push(ent2);
entities.push(ent3);
entities.push(item);

const input = new InputSystem();
const collision = new CollisionSystem();
const overlap = new OverlapSystem();
const renderer = new RenderSystem();
const movement = new MovementSystem();
const bots = new BotSystem();
let paused = false;

// MAIN GAME LOOP
(function update() {
    try {
        if(!paused) {
            requestAnimationFrame(update);

            renderer.update(entities);
            bots.update(entities);
            input.update(entities);
            movement.update(entities);
            collision.update(entities);
            overlap.update(entities);
        }
    } catch(e) {
        paused = true;
        throw new Error(e);
    }
})();
