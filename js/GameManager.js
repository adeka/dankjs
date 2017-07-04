//game systems
import RenderSystem from "js/systems/RenderSystem";
import MovementSystem from "js/systems/MovementSystem";
import InputSystem from "js/systems/InputSystem";
import CollisionSystem from "js/systems/CollisionSystem";
import OverlapSystem from "js/systems/OverlapSystem";
import BotSystem from "js/systems/BotSystem";
import InterfaceSystem from "js/systems/InterfaceSystem";
import Entity from "js/Entity";

export default class GameManager {
    static entities = [];
    static systems = [
     new InputSystem(),
     new CollisionSystem(),
     new OverlapSystem(),
     new RenderSystem(),
     new MovementSystem(),
     new BotSystem(),
     new InterfaceSystem()
    ];
    static init(entities) {
        Object.entries(entities).forEach((entity) => {
            new Entity(entity[1]);
        });
    }
    static addEntity(entity){
        GameManager.entities.push(entity);
    }
    static removeEntity(removedEntity) {
        GameManager.entities = GameManager.entities.filter((entity) => {
            return entity.id !== removedEntity.id;
        });
    }
    static update(entities){
        this.systems.forEach((system) => {
            system.update(this.entities);
        });
    }
}
