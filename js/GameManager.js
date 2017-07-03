const PIXI = require('pixi.js');

export default class GameManager {
    static renderer = new PIXI.WebGLRenderer(500, 500);
    static stage = new PIXI.Container();
    static entities = [];
    static addEntity(entity){
        GameManager.entities.push(entity);
    }
    static removeEntity(removedEntity) {
        GameManager.entities = GameManager.entities.filter((entity) => {
            return entity.id !== removedEntity.id;
        });
    }
}
