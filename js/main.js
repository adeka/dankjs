const PIXI = require("pixi.js");
require("ui/scss/main.scss");

// react for ui stuff
import React from "react";
import ReactDOM from "react-dom";

import HUD from "ui/components/HUD";

//game systems
import Entity from "js/Entity";
import RenderSystem from "js/systems/RenderSystem";
import MovementSystem from "js/systems/MovementSystem";
import InputSystem from "js/systems/InputSystem";
import CollisionSystem from "js/systems/CollisionSystem";
import OverlapSystem from "js/systems/OverlapSystem";
import BotSystem from "js/systems/BotSystem";
import InterfaceSystem from "js/systems/InterfaceSystem";

import GameManager from "js/GameManager";

let entities = [];
const ent = new Entity({
  Renderer: {
    sprite: "sunset.png"
  },
  Position: {
    x: 30,
    y: 30
  },
  Inventory: {},
  Input: {
    axes: {
      moveVertical: {
        min: "w",
        max: "s"
      },
      moveHorizontal: {
        min: "a",
        max: "d"
      }
    },
    actions: {
      use: "e",
      attack: "r t g",
      inventory: "i"
    }
  },
  Movement: {
    speed: 3
  },
  Collider: {
    width: 50,
    height: 50
  },
  Overlap: {
    width: 60,
    height: 60
  }
});

const ent2 = new Entity({
  Renderer: {
    sprite: "plain.png"
  },
  Position: {
    x: 300,
    y: 80
  },
  Movement: {
    speed: 1
  },
  Collider: {
    width: 50,
    height: 50
  },
  Bot: {}
});

const ent3 = new Entity({
  Info: {
    name: "Fire Pit"
  },
  Renderer: {
    sprite: "fire.png"
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
  Info: {
    name: "Scroll"
  },
  Renderer: {
    sprite: "scroll.png"
  },
  Position: {
    x: 350,
    y: 225
  },
  Overlap: {
    width: 50,
    height: 50
  }
});

const apple = new Entity({
  Info: {
    name: "Dank Old Coin"
  },
  Renderer: {
    sprite: "coin.png"
  },
  Position: {
    x: 350,
    y: 325
  },
  Overlap: {
    width: 50,
    height: 50
  },
  Pickup: {}
});
GameManager.addEntity(ent);
GameManager.addEntity(ent2);
GameManager.addEntity(ent3);
GameManager.addEntity(item);
GameManager.addEntity(apple);

const input = new InputSystem();
const collision = new CollisionSystem();
const overlap = new OverlapSystem();
const renderer = new RenderSystem();
const movement = new MovementSystem();
const bots = new BotSystem();
const ui = new InterfaceSystem();
let paused = false;

// MAIN GAME LOOP
(function update() {
  try {
    if (!paused) {
      requestAnimationFrame(update);

      renderer.update(GameManager.entities);
      bots.update(GameManager.entities);
      input.update(GameManager.entities);
      movement.update(GameManager.entities);
      collision.update(GameManager.entities);
      overlap.update(GameManager.entities);
      ui.update(GameManager.entities);
    }
  } catch (e) {
    paused = true;
    throw new Error(e);
  }
})();

ReactDOM.render(<HUD />, document.getElementsByClassName("ui").item(0));
