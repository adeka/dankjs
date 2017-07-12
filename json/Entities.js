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
            }
        },
        Position: {
            x: 3200,
            y: 3200
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
            width: 64,
            height: 64,
            dynamic: true
        },
        Overlap: {
            width: 80,
            height: 80,
            dynamic: true
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
