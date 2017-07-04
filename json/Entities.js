export const entities = {
    player: {
        Renderer: {
            sprite: "sunset.png"
        },
        Position: {
            x: 30,
            y: 30
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
            width: 50,
            height: 50
        },
        Overlap: {
            width: 60,
            height: 60
        }
    },
    enemy: {
        Renderer: {
            sprite: "plain.png"
        },
        Position: {
            x: 300,
            y: 80
        },
        Movement: {
            speed: 1
        },
        Collider: {
            width: 50,
            height: 50
        },
        Bot: {}
    },
    fire: {
        Info: {
            name: "Fire Pit"
        },
        Renderer: {
            sprite: "fire.png"
        },
        Position: {
            x: 200,
            y: 180
        },
        Collider: {
            width: 100,
            height: 60
        },
        Overlap: {
            width: 150,
            height: 110
        }
    },
    scroll: {
        Info: {
            name: "Scroll"
        },
        Renderer: {
            sprite: "scroll.png"
        },
        Position: {
            x: 350,
            y: 225
        },
        Overlap: {
            width: 50,
            height: 50
        },
        Pickup: {}
    },
    coin: {
        Info: {
            name: "Dank Old Coin"
        },
        Renderer: {
            sprite: "coin.png"
        },
        Position: {
            x: 350,
            y: 325
        },
        Overlap: {
            width: 50,
            height: 50
        },
        Pickup: {}
    }
}
