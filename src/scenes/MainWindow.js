import Enumerable from 'linq';
import { MazeRendererConfig } from "./constants/Configs/MazeRendererConfig";

export class MainWindow extends Phaser.Scene {
    constructor() {
        super('MainWindow');
    }

    create() {
        this.togglePageVisibility(false);
        this.createElement();
    }

    createElement() {
        const maze = this.generateMaze(15, 15);
        this.mazeRenderer(maze);
    }

    generateMaze(columns, rows) {
        let cellsList = [];
        for (let x = 0; x < columns; x++) {
            for (let y = 0; y < rows; y++) {
                const cell = {
                    x: x,
                    y: y,
                    type: "Wall"
                };

                cellsList.push(cell);
            }
        }

        let openCellsList = [];

        const rundIndex = Math.floor(Math.random() * cellsList.length);
        let firstCell = cellsList[rundIndex];

        if (firstCell.x === 0 || firstCell.x === columns - 1
            || firstCell.y === 0 || firstCell.y === rows - 1)
            firstCell = {
                x: Math.floor(columns / 2),
                y: Math.floor(rows / 2),
                type: "Wall"
            }

        openCellsList.push(firstCell);
        this.replaceCell(firstCell, "Grass1", cellsList);

        while (openCellsList.length > 0) {
            const rundIndex = Math.floor(Math.random() * openCellsList.length);
            const rundOpenCell = openCellsList[rundIndex];
            let nearestWallCells = this.getNearestWallCells(rundOpenCell, cellsList, columns, rows);
            let nearestNotWallCells = this.getNearestNotWallCells(rundOpenCell, cellsList, columns, rows);
            console.log();
            if (nearestWallCells.length > 2 && nearestNotWallCells.length < 3) {
                nearestWallCells.forEach(el => {
                    openCellsList.push(el);
                })
                console.log(openCellsList);
                const rundIndex = Math.floor(Math.random() * nearestWallCells.length);
                const rundNearestCell = nearestWallCells[rundIndex];
                const cell = this.replaceCell(rundNearestCell, "Grass1", cellsList);
            }
            else
                this.deleteCellFromList(rundOpenCell, openCellsList);
        }
        return cellsList;
    }

    mazeRenderer(cellsList) {
        cellsList.forEach(cell => {
            const conf = MazeRendererConfig.Cells;
            const x = conf[cell.type].x + conf.with * cell.x;
            const y = conf[cell.type].y + conf.height * cell.y;
            const cellImg = this.make.image(conf[cell.type], true).setX(x).setY(y);
        });
    }

    getNearestNotWallCells(cell, cellsList, columns, rows) {
        let result = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if ((x !== 0 && y !== 0) || x === 0 && y === 0)
                    continue;

                const newCell = {
                    x: cell.x + x,
                    y: cell.y + y,
                    type: "Wall"
                }

                if (newCell.x < 0 || newCell.x >= columns
                    || newCell.y < 0 || newCell.x >= rows)
                    continue;

                const oldCell = Enumerable.from(cellsList)
                    .singleOrDefault(cell => cell.x === newCell.x
                        && cell.y === newCell.y
                        && cell.type !== newCell.type);

                if (oldCell)
                    result.push(oldCell);
            }
        }
        return result;
    }

    getNearestWallCells(cell, cellsList, columns, rows) {
        let result = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if ((x !== 0 && y !== 0) || x === 0 && y === 0)
                    continue;

                const newCell = {
                    x: cell.x + x,
                    y: cell.y + y,
                    type: "Wall"
                }

                if (newCell.x < 0 || newCell.x >= columns
                    || newCell.y < 0 || newCell.x >= rows)
                    continue;

                const oldCell = Enumerable.from(cellsList).singleOrDefault(x => JSON.stringify(x) == JSON.stringify(newCell));

                if (oldCell)
                    result.push(oldCell);
            }
        }
        return result;
    }

    replaceCell(cell, newType, cellsList) {
        for (let index = 0; index < cellsList.length; index++) {
            if (JSON.stringify(cell) == JSON.stringify(cellsList[index])) {
                cellsList[index].type = newType;
                return cellsList[index];
            }
        }
    }

    deleteCellFromList(cell, cellsList) {
        for (let index = 0; index < cellsList.length; index++) {
            if (JSON.stringify(cell) == JSON.stringify(cellsList[index])) {
                cellsList.splice(index, 1);
                return;
            }
        }
    }

    togglePageVisibility(bool) {
        this.scene[bool ? "wake" : "sleep"]();
        this.scene.setVisible(bool);
    }
}