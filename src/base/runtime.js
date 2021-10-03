import CommandExecutor from "./command_executor";
import Const from "../consts";
import Util from "../utils/util";
import Bot from "../objects/bot";
//import Dead from "../objects/dead";

export default class Runtime {
    constructor() {
        this.iteration = 0;
        this.generation = 0;
        this.maxGeneration = 0;
        this.maxAge = 0;
        this.countBots = 0;
        this.matrix = [];
        this.tmp_matrix = [];
        this.bots = [];
        this.tmp_bots = [];
        this.last_ten_bots = [];
        this.MAX_Y_FOR_SUN = Const.WORLD_HEIGHT / 2 + 3;
        this.Y_SUN_PERCENT = this.MAX_Y_FOR_SUN / 100;
        this.executor = new CommandExecutor(this);
    }

    init(config) {
        this.worldWidth = config.worldWidth;
        this.worldHeight = config.worldHeight;
        this.matrix = [];
        this.tmp_matrix = [];
        this.bots = [];
        this.tmp_bots = [];
        this.last_ten_bots = [];
        this.iteration = 0;
        this.maxGeneration = 0;
        this.MAX_Y_FOR_SUN = config.worldHeight / 2 + 3;
        this.Y_SUN_PERCENT = this.MAX_Y_FOR_SUN / 100;

        if (config.gameType === 'play') {
            this.generateWorld();
        } else if (config.gameType === 'editor') {
            this.generateEmptyWorld();
        }
    }

    addBot() {
        let bot = this.getEcologyBot();
        this.bots.push(bot);
        this.matrix[bot.y][bot.x] = Const.CELL_TYPE_BOT;
    }

    addBotToPosition(x, y) {
        if (x < 0 || y < 0 || x >= this.worldWidth || y >= this.worldHeight) {
            return null;
        }
        if (this.matrix[y][x] === Const.CELL_TYPE_BOT) {
            return null;
        }
        this.unselectAllBots();

        let bot = this.getEcologyBot();
        bot.x = x;
        bot.y = y;
        bot.selected = true;
        this.bots.push(bot);
        this.matrix[bot.y][bot.x] = Const.CELL_TYPE_BOT;
        return bot;
    }

    generateEmptyWorld() {
        for (let y = 0; y < this.worldHeight; y++) {
            this.matrix[y] = [];
            for (let x = 0; x < this.worldWidth; x++) {
                this.matrix[y][x] = Const.CELL_TYPE_EMPTY;
            }
        }
    }

    generateWorld() {
        for (let y = 0; y < this.worldHeight; y++) {
            this.matrix[y] = [];
            for (let x = 0; x < this.worldWidth; x++) {
                let cellType = this.constructor.getRandCellType();

                if (cellType === Const.CELL_TYPE_BOT) {
                    let bot;
                    if (Util.rand(0, 10) > 7) {
                        bot = this.getUniversalBot();
                    } else {
                        bot = this.getEcologyBot();
                    }
                    
                    this.bots.push(bot);
                    this.matrix[y][x] = cellType;
                } else if (cellType === Const.CELL_TYPE_DEAD) {
                    this.matrix[y][x] = Const.CELL_TYPE_DEAD;
                } else {
                    this.matrix[y][x] = cellType;
                }
            }
        }
    }

    getUniversalBot() {
        let bot = new Bot();
        bot.x = Util.rand(0, this.worldWidth - 1);
        bot.y = Util.rand(0, this.worldHeight - 1);

        bot.brain[0] = Const.COMMAND_TURN; bot.params[0] = -1; // random turn
        bot.brain[1] = Const.COMMAND_LOOK; bot.params[1] = Const.CELL_TYPE_EMPTY;
        bot.brain[2] = Const.COMMAND_GOTO; bot.params[2] = 4; // true, run move
        bot.brain[3] = Const.COMMAND_GOTO; bot.params[3] = 15; // false, run eat
        bot.brain[4] = Const.COMMAND_MOVE; bot.params[4] = -1; // Move to rand direction
        bot.brain[5] = Const.COMMAND_HP_LOWER; bot.params[5] = 100;// hp < 100
        bot.brain[6] = Const.COMMAND_GOTO; bot.params[6] = 8; // true, sleep
        bot.brain[7] = Const.COMMAND_GOTO; bot.params[7] = 0; // false, goto begin
        bot.brain[8] = Const.COMMAND_SLEEP; bot.params[8] = 1;
        bot.brain[9] = Const.COMMAND_SLEEP; bot.params[9] = 1;
        bot.brain[10] = Const.COMMAND_SLEEP; bot.params[10] = 1;
        bot.brain[11] = Const.COMMAND_GOTO; bot.params[11] = 15;
        bot.brain[12] = Const.COMMAND_GOTO; bot.params[12] = 23;
        bot.brain[13] = Const.COMMAND_GOTO;
        bot.brain[14] = Const.COMMAND_GOTO;

        bot.brain[15] = Const.COMMAND_EAT;
        bot.brain[16] = Const.COMMAND_GOTO; bot.params[16] = 0;
        bot.brain[17] = Const.COMMAND_GOTO;
        bot.brain[18] = Const.COMMAND_GOTO;
        bot.brain[19] = Const.COMMAND_GOTO;
        bot.brain[20] = Const.COMMAND_GOTO;
        bot.brain[21] = Const.COMMAND_GOTO;
        bot.brain[22] = Const.COMMAND_GOTO;

        bot.brain[23] = Const.COMMAND_GOTO; bot.params[23] = 0;
        bot.brain[24] = Const.COMMAND_GOTO; bot.params[24] = 0;
        bot.brain[25] = Const.COMMAND_GOTO; bot.params[25] = 0;
        bot.brain[26] = Const.COMMAND_GOTO;
        bot.brain[27] = Const.COMMAND_GOTO;
        bot.brain[28] = Const.COMMAND_GOTO;
        bot.brain[29] = Const.COMMAND_GOTO;
        bot.brain[30] = Const.COMMAND_GOTO;
        bot.brain[31] = Const.COMMAND_GOTO; bot.params[29] = 0;
        bot.brain[32] = Const.COMMAND_GOTO;
        bot.brain[33] = Const.COMMAND_GOTO;
        bot.brain[34] = Const.COMMAND_GOTO;
        bot.brain[35] = Const.COMMAND_GOTO;
        bot.brain[36] = Const.COMMAND_GOTO;
        
        bot.type = Const.BOT_TYPE_CUSTOM;

        return bot;
    }

    getEcologyBot() {
        let bot = new Bot();
        bot.x = Util.rand(0, this.worldWidth - 1);
        bot.y = Util.rand(0, this.worldHeight - 1);
        bot.brain[0] = Const.COMMAND_TURN; bot.params[0] = Const.DIRECTION_UP;
        bot.brain[1] = Const.COMMAND_LOOK; bot.params[1] = Const.CELL_TYPE_DEAD;
        bot.brain[2] = Const.COMMAND_GOTO; bot.params[2] = 15; // true, cell is dead
        bot.brain[3] = Const.COMMAND_TURN; bot.params[3] = Const.DIRECTION_RIGHT;// false
        bot.brain[4] = Const.COMMAND_LOOK; bot.params[4] = Const.CELL_TYPE_DEAD;// look DEAD
        bot.brain[5] = Const.COMMAND_GOTO; bot.params[5] = 15; // true
        bot.brain[6] = Const.COMMAND_TURN; bot.params[6] = Const.DIRECTION_DOWN;
        bot.brain[7] = Const.COMMAND_LOOK; bot.params[7] = Const.CELL_TYPE_DEAD;
        bot.brain[8] = Const.COMMAND_GOTO; bot.params[8] = 15;// true, cell is dead
        bot.brain[9] = Const.COMMAND_TURN; bot.params[9] = Const.DIRECTION_LEFT;
        bot.brain[10] = Const.COMMAND_LOOK; bot.params[10] = Const.CELL_TYPE_DEAD;
        bot.brain[11] = Const.COMMAND_GOTO; bot.params[11] = 15;// true, cell is dead
        bot.brain[12] = Const.COMMAND_GOTO; bot.params[12] = 23;
        bot.brain[13] = Const.COMMAND_GOTO;
        bot.brain[14] = Const.COMMAND_GOTO;

        bot.brain[15] = Const.COMMAND_EAT; // If bot is dead, then it him
        bot.brain[16] = Const.COMMAND_GOTO; bot.params[16] = 0;
        bot.brain[17] = Const.COMMAND_GOTO;
        bot.brain[18] = Const.COMMAND_GOTO;
        bot.brain[19] = Const.COMMAND_GOTO;
        bot.brain[20] = Const.COMMAND_GOTO;
        bot.brain[21] = Const.COMMAND_GOTO;
        bot.brain[22] = Const.COMMAND_GOTO;

        bot.brain[23] = Const.COMMAND_HP_LOWER; bot.params[23] = Const.HP_TO_CLONE + 20;// Sleep loop
        bot.brain[24] = Const.COMMAND_GOTO; bot.params[24] = 26;//true, goto sleep
        bot.brain[25] = Const.COMMAND_GOTO; bot.params[25] = 30; // false, goto clone
        bot.brain[26] = Const.COMMAND_SLEEP;
        bot.brain[27] = Const.COMMAND_SLEEP;
        bot.brain[28] = Const.COMMAND_SLEEP;
        bot.brain[29] = Const.COMMAND_GOTO; bot.params[29] = 0; // goto begin
        bot.brain[30] = Const.COMMAND_CLONE; // Clone bot
        bot.brain[31] = Const.COMMAND_GOTO; bot.params[29] = 0; // goto begin
        bot.brain[32] = Const.COMMAND_GOTO;
        bot.brain[33] = Const.COMMAND_GOTO;
        bot.brain[34] = Const.COMMAND_GOTO;
        bot.brain[35] = Const.COMMAND_GOTO;
        bot.brain[36] = Const.COMMAND_GOTO;
        
        bot.type = Const.BOT_TYPE_CUSTOM;

        return bot;
    }

    killAllBots() {
        this.matrix = [];

        for (let y = 0; y < this.worldHeight; y++) {
            this.matrix[y] = [];
            for (let x = 0; x < this.worldWidth; x++) {
                this.matrix[y][x] = Const.CELL_TYPE_EMPTY;
            }
        }

        this.bots = [];
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
        if (typeof entity === 'undefined') {
            return null;
        }

        return entity.type;
    }

    getRandFreePos(spawsOnDeads) {
        for (let i = 0; i < 5000; i++) {
            let x = Util.rand(0, this.worldWidth - 1);
            let y = Util.rand(0, this.worldHeight - 1);

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
                bot.params = winnerBots[i].params;
                bot.hp_to_clone = winnerBots[i].hp_to_clone;
                bot.generation = ++winnerBots[i].generation;
                bot.mutate();
                this.bots.push(bot);
            }
        }

        this.generation++;
    }

    generateFuckingGreenBots() {
        // let countGreenBots = Math.round((this.worldHeight * this.worldWidth) / 50);
        // console.log('count', countGreenBots);
        // let countGreenBots = Util.rand(1, 10);
        // for (let i = 0; i < countGreenBots; i++) {
        //     let pos = this.getRandFreePos(false);
        //     if (pos === null) {
        //         continue;
        //     }
        //
        //     let bot = new Bot();
        //     this.matrix[pos.y][pos.x] = Const.CELL_TYPE_BOT;
        //     bot.x = pos.x;
        //     bot.y = pos.y;
        //     bot.brain = [];
        //     let command = Const.COMMAND_SLEEP;
        //     for (let i = 0; i < Const.BRAIN_CAPACITY; i++) {
        //         bot.brain[i] = command;
        //     }
        //
        //     this.bots.push(bot);
        // }
    }

    getBotIndexByPos(x, y) {
        for (let i = 0; i < this.bots.length; i++) {
            if (this.bots[i] !== null && this.bots[i].x === x && this.bots[i].y === y) {
                return i;
            }
        }

        return null;
    }

    unselectAllBots() {
        this.bots.forEach((bot) => {
            if (bot && bot.selected) {
                bot.selected = false;
            }
        });
    }

    selectBotByXY(x, y) {
        let index = this.getBotIndexByPos(x, y);
        if (index === null) {
            return null;
        }

        this.unselectAllBots();

        this.bots[index].selected = true;

        return this.bots[index];
    }

    setBotByXY(x, y, bot) {
        let index = this.getBotIndexByPos(x, y);

        window.console.log('set bot to index', index);
        if (index === null) {
            return null;
        }

        this.bots[index] = bot;
    }

    isBotSelectedByPosition(position) {
        let index = this.getBotIndexByPos(position.x, position.y);
        if (index === null) {
            return false;
        }

        return this.bots[index].selected;
    }

    deleteBotByXY(x, y) {
        let index = this.getBotIndexByPos(x, y);
        if (index === null) {
            return;
        }

        this.bots.splice(index, 1);
        this.matrix[y][x] = Const.CELL_TYPE_EMPTY;
    }

    step() {
        this.iteration++;
        this.tmp_bots = [];
        this.tmp_matrix = this.matrix.slice(0);

        // Remove dead bots from array
        this.bots = this.bots.filter((item) => {
            return item !== null;
        });

        // if (this.iteration % 200 === 0) {
        //     console.log('iteration', this.iteration, 'bots:', this.bots.length, 'tmp_bots:', this.tmp_bots.length,
        //         'matrix:', this.matrix.length, 'last_ten', this.last_ten_bots.length);
        // }

        let updateMaxValues = this.iteration % 500 === 0;

        for (let i = 0; i < this.bots.length; i++) {
            if (this.bots[i] !== null) {
                this.executor.processBot(this.bots[i], i);

                if (updateMaxValues && this.bots[i] !== null) {
                    if (this.bots[i].generation > this.maxGeneration) {
                        this.maxGeneration = this.bots[i].generation;
                    }

                    if (this.bots[i].age > this.maxAge) {
                        this.maxAge = this.bots[i].age;
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

        // if (this.bots.length <= 20) {
        //     this.nextGeneration();
        // }

        // if (this.iteration % 30 === 0) {
        //     this.generateFuckingGreenBots();
        // }
    }
}