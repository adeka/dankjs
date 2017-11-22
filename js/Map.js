import * as Components from 'js/Components';
import FastSimplexNoise from 'fast-simplex-noise';
const groundNoise = new FastSimplexNoise({ frequency: 0.05, max: 100, min: 0, octaves: 3 });
const treesNoise = new FastSimplexNoise({ frequency: 0.1, max: 100, min: 0, octaves: 3 });

const tilemapRules = require('json/TilemapRules.json');
import Entity from "js/Entity";
import System from 'js/systems/System';

export default class Map extends System {
    constructor() {
        super();

        this.mapWidth = 100;
        this.mapHeight = 100;
        this.tileSize = 64;

        this.entities = {
            tiles: [],
            // tiles2: [],
            trees: []
        };

        const groundThreshold = 35;
        const groundThreshold2 = 60;
        const treesThreshold = 70;

        let groundMap = this.generateNoiseMap(groundNoise);
        let groundMap2 = this.generateNoiseMap(groundNoise);
        let treesMap = this.generateNoiseMap(treesNoise);

        this.runPruningIterations(groundMap, 20, groundThreshold);
        this.runPruningIterations(groundMap2, 20, groundThreshold2);

        treesMap.forEach((tile, i) => {
            if(groundMap[i].value < groundThreshold + 10) {
                tile.value = 0;
            }
        });

        this.createMapEntities(groundMap, groundThreshold, this.entities.tiles, "ground");
        // this.createMapEntities(groundMap2, groundThreshold2, this.entities.tiles2, "ground");
        this.createMapEntities(treesMap, treesThreshold, this.entities.trees, "trees");
    }
    getActiveEntities(entities) {
        let activeTiles = [];
        this.getEntitiesWithComponents(entities, Components.Input)
        .forEach((entity) => {
            const position = entity.getComponent(Components.Position);
            activeTiles.push(...this.getBoundingEntities(position.x, position.y, 3, this.entities.tiles));
            // activeTiles.push(...this.getBoundingEntities(position.x, position.y, 10, this.entities.tiles2));
            activeTiles.push(...this.getBoundingEntities(position.x, position.y, 3, this.entities.trees));
        });
        return activeTiles;
    }
    coordToIndex(x, y) {
        return ((y - 1) * this.mapWidth) + x;
    }
    getBoundingEntities(rawX, rawY, size, layer) {
        const entities = [];

        const x = Math.floor(rawX / this.tileSize);
        const y = Math.floor(rawY / this.tileSize);
        for (let yOff = 0; yOff < size * 2 + 1; yOff++)
        {
            for (let xOff = 0; xOff < size * 2; xOff++)
            {
                const index = this.coordToIndex(x - Math.round(size/2) - 1 + xOff, y - Math.round(size/2) + yOff);
                const tile = layer[index];
                if(tile) {
                    entities.push(tile);
                }
            }
        }
        return entities;
    }
    getEntitySprite(map, tile, type) {
        let tileEntity = null;
        Object.entries(tilemapRules[type]).forEach((entry) => {
            const tileType = entry[0];
            const rules = entry[1];
            const presentRulesPass = rules.present.every((rule) => {
                return map[rule];
            });
            const missingRulesPass = rules.missing.every((rule) => {
                return !map[rule];
            });
            if(presentRulesPass && missingRulesPass) {
                tileEntity = this.createTileEntity(tile, tileType, type, rules.offset, rules.collider);
            }
        });
        return tileEntity;
    }
    createTileEntity(tile, tileType, type, offset, collider) {
        const entity = {
            Renderer: {
                sprite: `${type}/${tileType}.png`,
                scale: {
                    x: 0.5,
                    y: 0.5
                }
            },
            Position: {
                x: tile.x * this.tileSize,
                y: tile.y * this.tileSize
            }
        };

        if(collider) {
            const colliderComponent = collider;
            if(offset) {
                colliderComponent['offset'] = offset;
            }
            entity['Collider'] = colliderComponent;
        }
        return new Entity(entity);
    }
    createMapEntities(noiseMap, threshold, list, type) {
        noiseMap.forEach((tile, index) => {
            const map = this.getNeighbors(noiseMap, index, threshold);
            list.push(this.getEntitySprite(map, tile, type));
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
        return {
            topLeft: ((map[i-width-1] || defaultValue).value > threshold),
            top: ((map[i-width] || defaultValue).value > threshold),
            topRight: ((map[i-width+1] || defaultValue).value > threshold),
            left: ((map[i-1] || defaultValue).value > threshold),
            center: ((map[i] || defaultValue).value > threshold),
            right: ((map[i+1] || defaultValue).value > threshold),
            bottomLeft: ((map[i+width-1] || defaultValue).value > threshold),
            bottom: ((map[i+width] || defaultValue).value > threshold),
            bottomRight: ((map[i+width+1] || defaultValue).value > threshold)
        }
    }
    generateNoiseMap(noiseFunction) {
        const noiseMap = [];
        for(let y = 0; y < this.mapWidth; y++){
            for(let x = 0; x < this.mapHeight; x++){
                const noise = noiseFunction.scaled([x, y]);
                noiseMap.push({value: noise, x: x, y: y});
            }
        }
        return noiseMap;
    }
}
