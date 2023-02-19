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
        Flag: {
            x: 360,
            y: 360,
            key: loadAssets.Cells.key,
            frame: "Flag",
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
    },
    WinText: {
        x: 1000,
        y: 1000,
        text: "Good job, you\'re not a robot.",
        origin: 0.5,
        fontSize: 80
    },
    LossText: {
        x: 1000,
        y: 1000,
        text: "Oooy,\nI'm sorry but you are a robot.",
        origin: 0.5,
        fontSize: 80
    },
    TimerText: {
        x: 900,
        y: 200,
        text: "Time left:",
        origin: 0.5,
        fontSize: 80,
        style: {
            color: '#000000',
        },
    },
    TimerValueText: {
        x: 1250,
        y: 200,
        text: "20",
        origin: 0.5,
        fontSize: 80,
        style: {
            color: '#000000',
        },
    }
}
