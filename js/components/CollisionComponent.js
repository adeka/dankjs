import Hitbox from 'js/components/base/Hitbox';

export default class CollisionComponent extends Hitbox {
    collision = {
        top: false,
        left: false,
        right: false,
        bottom: false
    }
    constructor(args) {
        super();
        this.dynamic = args.dynamic || false;
        this.rect = this.getRect(args.width, args.height);
    }
    collidesWith(collider) {
        return this.bump.rectangleCollision(this.rect, collider, true);
    }
}
