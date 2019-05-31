import CommandExecutor from "./command_executor";
import Const from "../consts";
import Util from "../utils/util";
import Bot from "../objects/bot";
import Dead from "../objects/dead";

export default class Runtime {
    constructor() {
        this.iteration = 0;
        this.generation = 0;
        this.matrix = [];
        this.tmp_matrix = [];
        this.bots = [];
        this.tmp_bots = [];
        this.last_ten_bots = [];
        this.executor = new CommandExecutor(this);
    }

    init() {
        this.matrix = [];
        this.tmp_matrix = [];
        this.bots = [];
        this.tmp_bots = [];
        this.last_ten_bots = [];
        this.iteration = 0;
        this.generateWorld();
    }

    generateWorld() {
        for (let y = 0; y < Const.WORLD_HEIGHT; y++) {
            this.matrix[y] = [];
            for (let x = 0; x < Const.WORLD_WIDTH; x++) {
                let cellType = this.constructor.getRandCellType();

                if (cellType === Const.CELL_TYPE_BOT) {
                    let bot = new Bot();
                    bot.x = x;
                    bot.y = y;
                    this.bots.push(bot);
                    this.matrix[y][x] = cellType;
                } else if (cellType === Const.CELL_TYPE_DEAD) {
                    this.matrix[y][x] = new Dead();
                } else {
                    this.matrix[y][x] = cellType;
                }
            }
        }
    }

    static getRandCellType() {
        let percentages = [[Const.CELL_TYPE_BOT, Const.BOT_PERCENT], [Const.CELL_TYPE_EMPTY, Const.EMPTY_PERCENT]].sort();
        let randValue = Math.random();
        let currPos = 0;
        for (let i = 0; i < percentages.length; i++) {
            if (randValue > currPos && randValue <= currPos + percentages[i][1]) {
                return percentages[i][0];
            }

            currPos += percentages[i][1];
        }

        return Const.CELL_TYPE_EMPTY;
    }

    getStepResult() {
        return this.matrix;
    }

    getCellType(entity) {
        if (typeof entity === 'number') {
            return entity;
        }

        return entity.type;
    }

    getRandFreePos(spawsOnDeads) {
        for (let i = 0; i < 5000; i++) {
            let x = Util.rand(0, Const.WORLD_WIDTH - 1);
            let y = Util.rand(0, Const.WORLD_HEIGHT - 1);

            let cellType = this.getCellType(this.matrix[y][x]);
            if (cellType === Const.CELL_TYPE_EMPTY || (spawsOnDeads && cellType === Const.CELL_TYPE_DEAD)) {
                return {x: x, y: y};
            }
        }

        return null;
    }

    nextGeneration() {
        let winnerBots = this.bots.slice(0);
        if (winnerBots.length < 20) {
            for (let i = 0; i < 20 - winnerBots.length; i++) {
                if (this.last_ten_bots.length - 1 >= i) {
                    winnerBots.push(this.last_ten_bots[i]);
                }
            }
        }

        for (let i = 0; i < winnerBots.length; i++) {
            if (winnerBots[i] === null) {
                continue;
            }
            for (let j = 0; j < 16; j++) {
                let pos = this.getRandFreePos(true);
                if (pos === null) {
                    continue;
                }

                let bot = new Bot();
                this.matrix[pos.y][pos.x] = Const.CELL_TYPE_BOT;
                bot.x = pos.x;
                bot.y = pos.y;
                bot.brain = winnerBots[i].brain;
                bot.mutateBrain(1);

                this.bots.push(bot);
            }
        }

        this.generation++;
    }

    generateFuckingGreenBots() {
        // let countGreenBots = Math.round((Runtime.WORLD_HEIGHT * Runtime.WORLD_WIDTH) / 50);
        // console.log('count', countGreenBots);
        let countGreenBots = Util.rand(1, 10);
        for (let i = 0; i < countGreenBots; i++) {
            let pos = this.getRandFreePos(false);
            if (pos === null) {
                continue;
            }

            let bot = new Bot();
            this.matrix[pos.y][pos.x] = Const.CELL_TYPE_BOT;
            bot.x = pos.x;
            bot.y = pos.y;
            bot.brain = [];
            for (let i = 0; i < Const.BRAIN_CAPACITY; i++) {
                bot.brain[i] = Const.COMMAND_SLEEP;
            }

            this.bots.push(bot);
        }
    }

    getBotIndexByPos(x, y) {
        for (let i = 0; i < this.bots.length; i++) {
            if (this.bots[i] !== null && this.bots[i].x === x && this.bots[i].y === y) {
                return i;
            }
        }

        return null;
    }

    step() {
        this.iteration++;
        this.tmp_bots = [];
        this.tmp_matrix = this.matrix.slice(0);

        // Remove dead bots from array
        this.bots = this.bots.filter((item) => {
            return item !== null;
        });

        for (let i = 0; i < this.bots.length; i++) {
            if (this.bots[i] !== null) {
                this.executor.processBot(this.bots[i], i);
            }
        }

        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                let cellType = this.getCellType(this.matrix[y][x]);
                if (cellType === Const.CELL_TYPE_DEAD) {
                    this.matrix[y][x].age++;
                    if (this.matrix[y][x].age > Const.DEAD_AGE_TO_DEAD) {
                        this.matrix[y][x] = Const.CELL_TYPE_EMPTY;
                    }
                }
            }
        }

        if (this.tmp_bots.length > 0) {
            for (let i = 0; i < this.tmp_bots.length; i++) {
                this.bots.push(this.tmp_bots[i]);
            }
        }
        this.tmp_bots = [];

        this.matrix = this.tmp_matrix;
        this.tmp_matrix = [];

        if (this.bots.length <= 20) {
            this.nextGeneration();
        }

        if (this.iteration % 30 === 0) {
            this.generateFuckingGreenBots();
        }
    }
}