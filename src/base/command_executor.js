import Const from "../consts";
import Util from "../utils/util";
import Bot from "../objects/bot";
import Dead from "../objects/dead";

export default class CommandExecutor {
    constructor(runtime) {
        this.runtime = runtime;
    }

    static commandIsMove(command) {
        return command === Const.COMMAND_MOVE;
    }

    static commandIsLook(command) {
        return command === Const.COMMAND_LOOK;
    }

    static commandIsTurn(command) {
        return command === Const.COMMAND_TURN;
    }

    static commandIsEat(command) {
        return command === Const.COMMAND_EAT;
    }

    static commandIsSunSleep(command) {
        return command === Const.COMMAND_SLEEP;
    }

    static commandIsGiveEnergy(command) {
        return command === Const.COMMAND_GIVE_ENERGY;
    }

    static commandIsHPLower(command) {
        return command === Const.COMMAND_HP_LOWER;
    }

    static commandIsHPBigger(command) {
        return command === Const.COMMAND_HP_BIGGER;
    }

    static commandIsClone(command) {
        return command === Const.COMMAND_CLONE;
    }

    static commandIsHaveSun(command) {
        return command === Const.COMMAND_HAVE_SUN;
    }

    getSunEnergy(bot) {
        if (bot.y > this.runtime.MAX_Y_FOR_SUN) {
            return 0;
        }

        return ((100 - (bot.y / this.runtime.Y_SUN_PERCENT)) / 10) * Const.SUN_ENERGY_REWARD_COEFICIENT;
    }

    commandIterations(bot) {
        if (bot === null) {
            return;
        }
        for (let i = 0; i < 20; i++) {
            //debugger;
            let command = bot.brain[bot.command_cursor];

            if (bot.debug) {
                debugger;
            }

            // 1
            if (this.constructor.commandIsMove(command)) {
                // Move
                //debugger;
                let direction = bot.params[bot.command_cursor] % 8;
                let newPos = Util.xyFromVector(bot.x, bot.y, direction);
                let newPosCellType = this.runtime.getCellType(this.runtime.matrix[newPos.y][newPos.x]);
                if (newPosCellType !== Const.CELL_TYPE_EMPTY) {
                    let cursorModifier = newPosCellType + 1;
                    bot.increaseCursor(cursorModifier);
                }

                switch (newPosCellType) {
                    case Const.CELL_TYPE_WALL:
                        return;
                    case Const.CELL_TYPE_BOT:
                        return;
                    case Const.CELL_TYPE_DEAD:
                        return;
                    case Const.CELL_TYPE_EMPTY:
                        this.runtime.tmp_matrix[bot.y][bot.x] = Const.CELL_TYPE_EMPTY;
                        this.runtime.tmp_matrix[newPos.y][newPos.x] = Const.CELL_TYPE_BOT;
                        bot.y = newPos.y;
                        bot.x = newPos.x;
                        bot.hp -= 1;
                        return;
                    default:
                        return;
                }
                // 2
            } else if (this.constructor.commandIsLook(command)) {
                // Look
                let newPos = Util.xyFromVector(bot.x, bot.y, bot.direction);
                let targetPosCellType = this.runtime.getCellType(this.runtime.matrix[newPos.y][newPos.x]);
                let cursorModifier = bot.command_cursor + targetPosCellType + 1;
                bot.increaseCursor(cursorModifier);
                return;
                // 3
            } else if (this.constructor.commandIsTurn(command)) {
                // Turn
                bot.direction = bot.params[bot.command_cursor] % 8;
                bot.increaseCursor(1);
                return;
                // 4
            } else if (this.constructor.commandIsEat(command)) {
                // Eat
                let direction = bot.params[bot.command_cursor] % 8;
                let targetPos = Util.xyFromVector(bot.x, bot.y, direction);
                let targetPosCellType = this.runtime.getCellType(this.runtime.matrix[targetPos.y][targetPos.x]);

                switch (targetPosCellType) {
                    case Const.CELL_TYPE_BOT:
                        let targetBotIndex = this.runtime.getBotIndexByPos(targetPos.x, targetPos.y);
                        if (targetBotIndex !== null) {
                            this.addToLast(this.runtime.bots[targetBotIndex]);
                            this.runtime.bots[targetBotIndex] = null;
                            this.runtime.tmp_matrix[targetPos.y][targetPos.x] = Const.CELL_TYPE_EMPTY;
                            bot.hp += Const.EAT_BOT_REWARD;
                            bot.kill_score++;
                        }

                        bot.increaseCursor(3);
                        return;
                    case Const.CELL_TYPE_DEAD:
                        this.runtime.tmp_matrix[targetPos.y][targetPos.x] = Const.CELL_TYPE_EMPTY;
                        bot.hp += Const.EAT_DEAD_REWARD;
                        bot.kill_score++;
                        bot.increaseCursor(4);
                        return;
                    default:
                        bot.increaseCursor(2);
                        return;
                }
                // 5
            } else if (this.constructor.commandIsSunSleep(command)) {
                // Sleep
                let e = this.getSunEnergy(bot);
                if (e > 0) {
                    bot.hp += e;
                    bot.sun_energy += e;
                    bot.increaseCursor(1);
                } else {
                    bot.increaseCursor(2);
                }
                return;
            } else if (this.constructor.commandIsGiveEnergy(command)) {
                let neighboars = this.getNeighboars(bot);
                if (neighboars.length <= 0) {
                    bot.increaseCursor(1);
                    return;
                }

                let energyToGive = bot.params[bot.command_cursor] % 64;
                let neighboard = neighboars[Util.rand(0, neighboars.length - 1)];
                neighboard.hp += energyToGive;
                bot.hp -= energyToGive;
                bot.increaseCursor(1);
                return;
            } else if (this.constructor.commandIsHPLower(command)) {
                let checkWith = bot.params[bot.command_cursor];
                if (bot.hp < checkWith) {
                    bot.increaseCursor(1);
                } else {
                    bot.increaseCursor(2);
                }
            } else if (this.constructor.commandIsHPBigger(command)) {
                let checkWith = bot.params[bot.command_cursor];
                if (bot.hp > checkWith) {
                    bot.increaseCursor(1);
                } else {
                    bot.increaseCursor(2);
                }
            } else if (this.constructor.commandIsClone(command)) {
                if (bot.hp >= bot.hp_to_clone + 10) {
                    this.cloneBot(bot);
                    bot.increaseCursor(1);
                } else {
                    bot.increaseCursor(2);
                }
                return;
            } else if (this.constructor.commandIsHaveSun(command)) {
                if (bot.y <= this.runtime.MAX_Y_FOR_SUN) {
                    bot.increaseCursor(1);
                } else {
                    bot.increaseCursor(2);
                }
            } else {
                // Goto
                bot.increaseCursor(command);
            }
        }
    }

    getBotEmptyNeighboarPos(bot) {
        for (let i = 0; i < 8; i++) {
            let pos = Util.xyFromVector(bot.x, bot.y, i);
            let cellType = this.runtime.getCellType(this.runtime.tmp_matrix[pos.y][pos.x]);
            if (cellType === Const.CELL_TYPE_EMPTY) {
                return pos;
            }
        }

        return null;
    }

    getNeighboars(bot) {
        let neighboars = [];
        for (let i = 0; i < 8; i++) {
            let pos = Util.xyFromVector(bot.x, bot.y, i);
            let cellType = this.runtime.getCellType(this.runtime.tmp_matrix[pos.y][pos.x]);
            if (cellType === Const.CELL_TYPE_BOT) {
                neighboars.push({x: pos.x, y: pos.y});
            }
        }

        return neighboars;
    }

    cloneBot(bot) {
        let emptyPos = this.getBotEmptyNeighboarPos(bot);
        if (emptyPos === null) {
            return false;
        }

        bot.hp -= bot.hp_to_clone;
        let newBot = new Bot();
        newBot.x = emptyPos.x;
        newBot.y = emptyPos.y;
        newBot.hp_to_clone = bot.hp_to_clone;
        newBot.brain = bot.brain;
        newBot.params = bot.params;
        newBot.generation = ++bot.generation;
        newBot.mutate();
        this.runtime.tmp_matrix[newBot.y][newBot.x] = Const.CELL_TYPE_BOT;
        this.runtime.tmp_bots.push(newBot);

        return true;
    }

    addToLast(bot) {
        // this.runtime.last_ten_bots.unshift(bot);
        // if (this.runtime.last_ten_bots.length > 10) {
        //     this.runtime.last_ten_bots.splice(-1, 1)
        // }
    }

    processBot(bot, botIndex) {
        this.commandIterations(bot, botIndex);
        bot.hp--;
        bot.age++;

        if (bot.hp <= 0) {
            this.runtime.tmp_matrix[bot.y][bot.x] = new Dead();
            this.addToLast(this.runtime.bots[botIndex]);
            this.runtime.bots[botIndex] = null;
        } else if (bot.hp > bot.hp_to_clone * Const.BOT_FORCE_CLONE_COEFICIENT) {
            if (Math.random() < Const.BOT_FORCE_CLONE_RAND_VALUE) {
                if (!this.cloneBot(bot)) {
                    this.addToLast(this.runtime.bots[botIndex]);
                    this.runtime.bots[botIndex] = null;
                    this.runtime.tmp_matrix[bot.y][bot.x] = new Dead();
                }
            }
        }
    }
}