import { loadAssets } from "../GameConstants";

export const MazeRendererConfig = {
    Cells: {
        with: 100,
        height: 100,
        Wall: {
            x: 360,
            y: 360,
            key: loadAssets.Cells.key,
            frame: "Wall",
            origin: 1,
            scale: 10
        },
        Grass1: {
            x: 360,
            y: 360,
            key: loadAssets.Cells.key,
            frame: "Grass1",
            origin: 1,
            scale: 10
        },
        Grass2: {
            x: 360,
            y: 360,
            key: loadAssets.Cells.key,
            frame: "Grass2",
            origin: 1,
            scale: 10
        },
        Grass3: {
            x: 360,
            y: 360,
            key: loadAssets.Cells.key,
            frame: "Grass3",
            origin: 1,
            scale: 10
        },
        Hero: {
            x: 360,
            y: 360,
            key: loadAssets.Hero.key,
            origin: 1,
            scale: 10
        },
    }
}
