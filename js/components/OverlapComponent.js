import Hitbox from 'js/components/base/Hitbox';

export default class OverlapComponent extends Hitbox {
    constructor(args) {
        super();
        this.dynamic = args.dynamic || false;
        this.rect = this.getRect(args.width, args.height);
    }
    overlapsWith(collider) {
        return this.bump.hitTestRectangle(this.rect, collider);
    }
}
