const PIXI = require('pixi.js');
import Mousetrap from 'mousetrap';

export default class InputComponent {
    axes = {};
    actions = {};
    actionBindings = [];

    constructor(args) {
        if(args.axes) {
            Object.entries(args.axes).forEach((entry) => this.addAxis(entry[0], entry[1]));
        }
        if(args.actions) {
            Object.entries(args.actions).forEach((entry) => this.addAction(entry[0], entry[1]));
        }
    }
    addAxis(name, mapping) {
        this.axes[name] = 0;
        Mousetrap.bind(mapping.min, () => this.updateAxisValue(name, -1), 'keydown');
        Mousetrap.bind(mapping.max, () => this.updateAxisValue(name, 1), 'keydown');
        Mousetrap.bind(mapping.min, () => this.updateAxisValue(name, 0), 'keyup');
        Mousetrap.bind(mapping.max, () => this.updateAxisValue(name, 0), 'keyup');
    }
    updateAxisValue(name, value) {
        this.axes[name] = value;
    }
    getAxisValue(axis) {
        return this.axes[axis] ? this.axes[axis] : 0;
    }

    addAction(name, mapping) {
        this.actions[name] = mapping;
    }
    onAction(action, callback) {
        if(!this.actionBindings.includes(action) && this.actions[action]) {
            Mousetrap.bind(this.actions[action], callback);
            this.actionBindings.push(action);
        }
    }
}
