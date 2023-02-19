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

        while (openCellsList.length > 0) {
            const rundIndex = Math.floor(Math.random() * openCellsList.length);
            const rundOpenCell = openCellsList[rundIndex];
            console.log(openCellsList.length);
            this.deleteCellFromList(rundOpenCell, openCellsList);
            let nearestWallCells = this.getNearestCells(rundOpenCell, cellsList, columns, rows, "Wall");

            let nearestDiagonalGroundCells = this.getNearestDiagonalCells(rundOpenCell, cellsList, columns, rows, "Grass1");

            if (nearestWallCells.length > 2 && nearestDiagonalGroundCells.length < 2) {
                this.replaceCell(rundOpenCell, "Grass1", cellsList);
                nearestWallCells.forEach(el => {
                    this.addCellInList(el, openCellsList);
                });
            }
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

    getNearestDiagonalCells(cell, cellsList, columns, rows, cellType) {
        let result = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if ((x !== 0 && y !== 0)) {
                    const newCell = {
                        x: cell.x + x,
                        y: cell.y + y,
                        type: cellType
                    }

                    if (newCell.x < 0 || newCell.x >= columns
                        || newCell.y < 0 || newCell.x >= rows)
                        continue;

                    const oldCell = Enumerable.from(cellsList).singleOrDefault(x => JSON.stringify(x) == JSON.stringify(newCell));

                    if (oldCell)
                        result.push(oldCell);
                }
            }
        }
        return result;
    }

    getNearestCells(cell, cellsList, columns, rows, cellType) {
        let result = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if ((x !== 0 && y !== 0) || (x === 0 && y === 0))
                    continue;

                const newCell = {
                    x: cell.x + x,
                    y: cell.y + y,
                    type: cellType
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

    addCellInList(cell, cellsList) {
        for (let index = 0; index < cellsList.length; index++) {
            if (cell.x === cellsList[index].x && cell.y === cellsList[index].y) {
                return;
            }
        }
        cellsList.push(cell);
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