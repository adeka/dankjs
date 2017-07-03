import * as Components from 'js/Components';
import * as Utils from 'js/Utils';

export default class Entity {
    components = {};
    constructor(args) {
        this.args = args;
        this.id = Utils.generateUUID();
        Object.entries(args).forEach((component) => this.addComponent(component[0], component[1]));
    }
    addComponent(name, args) {
        const componentClass = Components[name];
        if(componentClass) {
            this.components[componentClass] = Reflect.construct(componentClass, [args])
        } else {
            throw new Error(`${name} is not a valid component.`);
        }
    }
    getComponent(component) {
        return this.components[component];
    }
    getComponentsOfType(type) {
        return Object.keys(this.components).map((key) => {
            if(Reflect.getPrototypeOf(this.components[key].constructor) === type) {
                return this.components[key];
            }
        })
        .filter((component) => {
            return component !== undefined;
        });
    }
}
