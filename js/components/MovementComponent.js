export default class MovementComponent {
    constructor(args) {
        this.speed = args.speed;
        this.velocity = { x: 0, y: 0 };
    }
    setVelocity(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    }
}
