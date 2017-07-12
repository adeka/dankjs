const PIXI = require("pixi.js");
require("ui/scss/main.scss");

import React from "react";
import ReactDOM from "react-dom";
import HUD from "ui/components/HUD";

import GameManager from "js/GameManager";
import Entity from "js/Entity";
import { entities } from "json/Entities";

let paused = false;
GameManager.init(entities);

(function update() {
    try {
        if (!paused) {
            requestAnimationFrame(update);
            GameManager.update();
        }
    } catch (e) {
        paused = true;
        throw new Error(e);
    }
})();

ReactDOM.render(<HUD />, document.getElementsByClassName("ui").item(0));
