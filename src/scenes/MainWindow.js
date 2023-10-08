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
        const startPoint = this.getStartPoint(maze);
        this.currentHeroPoisition = startPoint;
        const mazeWhithFinish = this.addFinishPoint(maze, 15, 15);
        this.mazeRenderer(mazeWhithFinish);
        this.heroRenderer(startPoint);
        this.inputHandler(mazeWhithFinish);
        this.createGameTimer();
    }

    inputHandler(maze) {
        this.input.keyboard.on('keydown-W', () => {
            let directionVector2 = this.getDirection();
            directionVector2.y -= 1;
            this.getNewHeroPosition(directionVector2, maze);
            this.heroRenderer();
        });
        this.input.keyboard.on('keydown-A', () => {
            let directionVector2 = this.getDirection();
            directionVector2.x -= 1;
            this.getNewHeroPosition(directionVector2, maze);
            this.heroRenderer();
        });
        this.input.keyboard.on('keydown-S', () => {
            let directionVector2 = this.getDirection();
            directionVector2.y += 1;
            this.getNewHeroPosition(directionVector2, maze);
            this.heroRenderer();
        });
        this.input.keyboard.on('keydown-D', () => {
            let directionVector2 = this.getDirection();
            directionVector2.x += 1;
            this.getNewHeroPosition(directionVector2, maze);
            this.heroRenderer();
        });
    }

    disableInputHandler() {
        this.input.keyboard.off('keydown-W');
        this.input.keyboard.off('keydown-A');
        this.input.keyboard.off('keydown-S');
        this.input.keyboard.off('keydown-D');
    }

    getDirection() {
        return {
            x: 0,
            y: 0
        };
    }

    getNewHeroPosition(directionVector2, maze) {
        const newHeroPosition = {
            x: this.currentHeroPoisition.x + directionVector2.x,
            y: this.currentHeroPoisition.y + directionVector2.y
        }

        const targetCell = Enumerable.from(maze)
            .singleOrDefault(x => x.x == newHeroPosition.x && x.y == newHeroPosition.y && x.type !== "Wall");

        if (targetCell)
            this.currentHeroPoisition = targetCell;

        if (this.isAWin()) this.renderWinState();
    }

    heroRenderer() {
        const conf = MazeRendererConfig.Cells;
        const x = conf.Hero.x + conf.with * this.currentHeroPoisition.x;
        const y = conf.Hero.y + conf.height * this.currentHeroPoisition.y;

        if (!this.hero) {
            this.hero = this.make.image(conf.Hero, true).setX(x).setY(y);
        }
        else {
            this.hero.setX(x).setY(y);
        }
    }

    isAWin() {
        return this.currentHeroPoisition.x == this.FinishPosition.x && this.currentHeroPoisition.y == this.FinishPosition.y;
    }

    renderWinState() {
        this.make.text(MazeRendererConfig.WinText).setFontSize(MazeRendererConfig.WinText.fontSize);
        this.timer.remove();
        this.disableInputHandler();
    }

    createGameTimer() {
        this.make.text(MazeRendererConfig.TimerText).setFontSize(MazeRendererConfig.TimerText.fontSize);
        const timeLeft = this.make.text(MazeRendererConfig.TimerValueText).setFontSize(MazeRendererConfig.TimerValueText.fontSize);
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                timeLeft.setText(Number(timeLeft.text) - 1);
                if (Number(timeLeft.text) <= 0) {
                    this.renderLossState();
                    this.timer.remove();
                }
            },
            loop: true
        });
    }

    renderLossState() {
        this.make.text(MazeRendererConfig.LossText).setFontSize(MazeRendererConfig.LossText.fontSize);
        this.disableInputHandler();
    }

    mazeRenderer(cellsList) {
        cellsList.forEach(cell => {
            const conf = MazeRendererConfig.Cells;
            const x = conf[cell.type].x + conf.with * cell.x;
            const y = conf[cell.type].y + conf.height * cell.y;
            const cellImg = this.make.image(conf[cell.type], true).setX(x).setY(y);
        });
    }

    getStartPoint(maze) {
        const cell = {
            x: 0,
            y: 0,
            type: "Wall"
        }
        const targetCell = this.getNearestCellByXY(cell, maze, "Grass1", "Wall");
        return targetCell;
    }

    addFinishPoint(maze, columns, rows) {
        let targetCell;
        const cell = {
            x: columns - 2,
            y: rows - 2,
            type: "Grass1"
        }
        targetCell = Enumerable.from(maze).singleOrDefault(x => JSON.stringify(x) == JSON.stringify(cell));

        if (!targetCell) {
            targetCell = this.getNearestCellByXY(cell, maze, "Grass1", "Wall");
        }

        this.FinishPosition = targetCell;

        this.replaceCell(targetCell, "Flag", maze);
        return maze;
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

        const randIndex = Math.floor(Math.random() * cellsList.length);
        let firstCell = cellsList[randIndex];

        if (firstCell.x === 0 || firstCell.x === columns - 1
            || firstCell.y === 0 || firstCell.y === rows - 1)
            firstCell = {
                x: Math.floor(columns / 2),
                y: Math.floor(rows / 2),
                type: "Wall"
            }

        openCellsList.push(firstCell);

        while (openCellsList.length > 0) {
            const randIndex = Math.floor(Math.random() * openCellsList.length);
            const randOpenCell = openCellsList[randIndex];
            this.deleteCellFromList(randOpenCell, openCellsList);

            let nearestWallCells = this.getNearestCells(randOpenCell, cellsList, "Wall");
            let nearestDiagonalGroundCells = this.getNearestDiagonalCells(randOpenCell, cellsList, "Grass1");
            if (nearestWallCells.length > 2 && nearestDiagonalGroundCells.length < 5) {
                this.replaceCell(randOpenCell, "Grass1", cellsList);
                nearestWallCells.forEach(el => {
                    this.addCellInList(el, openCellsList);
                });
            }
        }
        return cellsList;
    }

    getNearestDiagonalCells(cell, cellsList, cellType) {
        let result = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (x !== 0 && y !== 0) {
                    const newCell = {
                        x: cell.x + x,
                        y: cell.y + y,
                        type: cellType
                    }

                    const oldCell = Enumerable.from(cellsList).singleOrDefault(x => JSON.stringify(x) == JSON.stringify(newCell));

                    if (oldCell)
                        result.push(oldCell);
                }
            }
        }
        return result;
    }

    getNearestCells(cell, cellsList, cellType) {
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

    getNearestCellByXY(cell, cellsList, cellType, secondType) {
        let nearestCells = this.getNearestCells(cell, cellsList, cellType);
        let nearestNotTargetCells = this.getNearestCells(cell, cellsList, secondType);
        while (nearestCells.length === 0) {
            if (nearestNotTargetCells.length > 0) {
                const randIndex = Math.floor(Math.random() * nearestNotTargetCells.length);
                const randNotTargetCell = nearestNotTargetCells[randIndex];
                this.deleteCellFromList(randNotTargetCell, nearestNotTargetCells);
                nearestCells = this.getNearestCells(randNotTargetCell, cellsList, cellType);
            }
            else {
                return Enumerable.from(cellsList).first(x => x.type === cellType);
            }
        }

        const randIndex = Math.floor(Math.random() * nearestCells.length);
        const randTargetCell = nearestCells[randIndex];
        return randTargetCell;
    }

    togglePageVisibility(bool) {
        this.scene[bool ? "wake" : "sleep"]();
        this.scene.setVisible(bool);
    }
}