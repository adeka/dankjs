export const entities = {
    player: {
        Info: {
            name: "Gramps"
        },
        Renderer: {
            sprite: "guy.png",
            size: {
                width: 64,
                height: 64
            },
            dynamic: true
        },
        Position: {
            x: 1600,
            y: 1600
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
            width: 32,
            height: 32,
            dynamic: true,
            offset: {
                x: 0,
                y: 20
            }
        },
        Overlap: {
            width: 80,
            height: 80,
            dynamic: true
        },
        StateMachine: {

        }
    },
    // enemy: {
    //     Renderer: {
    //         sprite: "plain.png"
    //     },
    //     Position: {
    //         x: 300,
    //         y: 80
    //     },
    //     Movement: {
    //         speed: 1
    //     },
    //     Collider: {
    //         width: 50,
    //         height: 50
    //     },
    //     Bot: {}
    // },
}
