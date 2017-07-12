import * as Components from 'js/Components';
import FastSimplexNoise from 'fast-simplex-noise';
const noiseGen = new FastSimplexNoise({ frequency: 0.05, max: 100, min: 0, octaves: 3 });
const tilemapRules = require('json/TilemapRules.json');
import Entity from "js/Entity";
import System from 'js/systems/System';

export default class Map extends System{
    constructor() {
        super();
        this.mapWidth = 100;
        this.mapHeight = 100;
        this.tileSize = 64;
        this.tiles = [];

        let noiseMap = this.generateNoiseMap();
        const threshold = 35;

        this.runPruningIterations(noiseMap, 10, threshold);
        this.createTiles(noiseMap, threshold);
    }
    getActiveTiles(entities) {
        let activeTiles;
        this.getEntitiesWithComponents(entities, Components.Input)
        .forEach((entity) => {
            const position = entity.getComponent(Components.Position);
            activeTiles = this.getBoundingTiles(position.x, position.y, 10);
        });
        return activeTiles;
    }
    coordToIndex(x, y) {
        return ((y - 1) * this.mapWidth) + x;
    }
    getBoundingTiles(rawX, rawY, size) {
        const boundingTiles = [];

        const x = Math.floor(rawX / this.tileSize);
        const y = Math.floor(rawY / this.tileSize);
        for (let yOff = 0; yOff < size * 2 + 1; yOff++)
        {
            for (let xOff = 0; xOff < size * 2; xOff++)
            {
                const index = this.coordToIndex(x - Math.round(size/2) - 1 + xOff, y - Math.round(size/2) + yOff);
                const tile = this.tiles[index];
                if(tile) {
                    boundingTiles.push(tile);
                }
            }
        }
        return boundingTiles;
    }
    getTileSprite(map, tile, path) {
        let tileEntity = null;
        Object.entries(tilemapRules).forEach((entry) => {
            const tileType = entry[0];
            const rules = entry[1];
            const presentRulesPass = rules.present.every((rule) => {
                return map[rule];
            });
            const missingRulesPass = rules.missing.every((rule) => {
                return !map[rule];
            });
            if(presentRulesPass && missingRulesPass) {
                const entity = {
                    Renderer: {
                        sprite: `${path}/${tileType}.png`,
                        size: {
                            width: 64,
                            height: 64
                        }
                    },
                    Position: {
                        x: tile.x * this.tileSize,
                        y: tile.y * this.tileSize
                    }
                };
                if(tileType !== 'center') {
                    entity['Collider'] = {
                        width: 16,
                        height:16
                    };
                }
                tileEntity = new Entity(entity);
            }
        });
        return tileEntity;
    }
    createTiles(noiseMap, threshold) {
        noiseMap.forEach((tile, index) => {
            const map = this.getNeighbors(noiseMap, index, threshold);
            this.tiles.push(this.getTileSprite(map, tile, 'grass'));
        });
    }
    runPruningIterations(noiseMap, iterations, threshold) {
        for(let i = 0; i < iterations; i++) {
            this.pruneNoiseMap(noiseMap, threshold);
        }
    }
    pruneNoiseMap(noiseMap, threshold) {
        noiseMap.forEach((tile, index) => {
            const map = this.getNeighbors(noiseMap, index, threshold);
            if(
                (!map.left && !map.right && !map.top && !map.bottom) ||
                (!map.left && !map.right && !map.top) ||
                (!map.left && !map.right && !map.bottom) ||
                (!map.left && !map.top && !map.bottom) ||
                (!map.right && !map.top && !map.bottom) ||
                (!map.top && !map.bottom) ||
                (!map.left && !map.right) ||
                (!map.topRight && !map.bottomLeft) ||
                (!map.topLeft && !map.bottomRight)
            ) {
                tile.value = 0;
            }
        });
    }
    getNeighbors(map, i, threshold) {
        const defaultValue = {value: 0, x: 0, y: 0};
        const width = this.mapWidth;

        const topLeft = map[i-width-1] || defaultValue;
        const top = map[i-width] || defaultValue;
        const topRight = map[i-width+1] || defaultValue;
        const left = map[i-1] || defaultValue;
        const center = map[i] || defaultValue;
        const right = map[i+1] || defaultValue;
        const bottomLeft = map[i+width-1] || defaultValue;
        const bottom = map[i+width] || defaultValue;
        const bottomRight = map[i+width+1] || defaultValue;

        return {
            topLeft: (topLeft.value > threshold),
            top: (top.value > threshold),
            topRight: (topRight.value > threshold),
            left: (left.value > threshold),
            center: (center.value > threshold),
            right: (right.value > threshold),
            bottomLeft: (bottomLeft.value > threshold),
            bottom: (bottom.value > threshold),
            bottomRight: (bottomRight.value > threshold)
        }
    }
    generateNoiseMap() {
        const noiseMap = [];
        for(let y = 0; y < this.mapWidth; y++){
            for(let x = 0; x < this.mapHeight; x++){
                const noise = noiseGen.scaled([x, y]);
                noiseMap.push({value: noise, x: x, y: y});
            }
        }
        return noiseMap;
    }
}
