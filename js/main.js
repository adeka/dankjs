const PIXI = require('pixi.js');
import Entity from 'js/Entity';
import RenderSystem from 'js/systems/RenderSystem';
import MovementSystem from 'js/systems/MovementSystem';
import InputSystem from 'js/systems/InputSystem';

let entities = [];
const ent = new Entity({
    Renderer: {
        sprite: 'blush.png'
    },
    Position: {
        x: 30,
        y: 30
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
        speed: 1
    }
});

const ent2 = new Entity({
    Renderer: {
        sprite: 'blue.png'
    },
    Position: {
        x: 80,
        y: 80
    },
    Movement: {
        speed: 1
    }
});
entities.push(ent);
entities.push(ent2);

const renderer = new RenderSystem();
const movement = new MovementSystem();
const input = new InputSystem();
let paused = false;

// MAIN GAME LOOP
(function update() {
    try {
        if(!paused) {
            requestAnimationFrame(update);
            renderer.update(entities);
            movement.update(entities);
            input.update(entities);

        }
    } catch(e) {
        paused = true;
        throw new Error(e);
    }
})();
