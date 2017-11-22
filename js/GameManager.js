//game systems
import RenderSystem from "js/systems/RenderSystem";
import MovementSystem from "js/systems/MovementSystem";
import InputSystem from "js/systems/InputSystem";
import CollisionSystem from "js/systems/CollisionSystem";
import OverlapSystem from "js/systems/OverlapSystem";
import BotSystem from "js/systems/BotSystem";
import InterfaceSystem from "js/systems/InterfaceSystem";
import Entity from "js/Entity";
import Map from "js/Map";

export default class GameManager {
    static map;
    static entities = [];
    static systems = [];
    static init(entities) {
        this.systems = [
            new CollisionSystem(),
            new MovementSystem(),
            new InputSystem(),
            new OverlapSystem(),
            new RenderSystem(),
            new BotSystem(),
            new InterfaceSystem()
        ];
        Object.entries(entities).forEach((entity) => {
            this.addEntity(new Entity(entity[1]));
        });
        this.map = new Map();
    }
    static addEntity(entity){
        GameManager.entities.push(entity);
    }
    static removeEntity(removedEntity) {
        GameManager.entities = GameManager.entities.filter((entity) => {
            return entity.id !== removedEntity.id;
        });
    }
    static update(){
        const entities = [...this.map.getActiveEntities(this.entities), ...this.entities];
        this.systems.forEach((system) => {
            system.update(entities);
        });
    }
}
