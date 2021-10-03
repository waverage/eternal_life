import Const from "../consts";
import Util from "../utils/util";

export default class Bot {
    constructor() {
        this.selected = false;
        this.generation = 0;
        this.age = 0;
        this.hp = Util.rand(Const.DEFAULT_MIN_BOT_HP, Const.DEFAULT_MAX_BOT_HP);
        this.sun_energy = 0;
        this.x = 0;
        this.y = 0;
        this.direction = Const.DIRECTIONS[Util.rand(0, 3)];
        this.command_cursor = 0;
        this.brain = [];
        this.params = [];
        for (let i = 0; i < Const.COMMAND_AMOUNT; i++) {
            this.brain[i] = 0;
            this.params[i] = 0;
        }

        this.kill_score = 0;
        this.hp_to_clone = Const.HP_TO_CLONE;
        this.color = {
            r: 62,
            g: 81,
            b: 221
        };
        this.debug = false;
        this.type = Const.BOT_TYPE_DEFAULT;
        this.initBrain();
    }

    increaseCursor(value) {
        if (value === -1) {
            this.command_cursor = 0;
            return;
        }

        this.command_cursor += value;
        if (this.command_cursor >= Const.COMMAND_AMOUNT) {
            this.command_cursor = this.command_cursor - Const.COMMAND_AMOUNT;
        }
    }

    setCursor(value) {
        if (value >= Const.COMMAND_AMOUNT) {
            value = 0;
        }

        this.command_cursor = value;
    }

    getRandCommand() {
        let command = Const.COMMANDS[Util.rand(0, Const.COMMANDS.length - 1)];
        if (command === Const.COMMAND_GOTO) {
            command = Util.rand(Const.COMMAND_GOTO, Const.COMMAND_AMOUNT);
        }
        return command;
    }

    initBrain() {
        this.brain = [];
        this.params = [];

        for (let i = 0; i < Const.BRAIN_CAPACITY; i++) {
            this.params.push(Util.rand(Const.MIN_BOT_PARAMS_VALUE, Const.MAX_BOT_PARAMS_VALUE));
            this.brain[i] = this.getRandCommand();
        }
    }

    initGreenBrain() {
        this.brain = [];
        this.params = [];

        for (let i = 0; i < Const.BRAIN_CAPACITY; i++) {
            this.params.push(Util.rand(Const.MIN_BOT_PARAMS_VALUE, Const.MAX_BOT_PARAMS_VALUE));
            this.brain[i] = Const.COMMAND_HAVE_SUN;
        }
    }

    mutate() {
        let rValue = Math.random();
        if (rValue < Const.MUTATE_BRAIN_TRIGGER_VALUE) {
            this.mutateBrain();
        }
        if (rValue > (1 - Const.MUTATE_PARAMS_TRIGGER_VALUE)) {
            this.mutateParams();
        }

        this.hp_to_clone += Util.rand(Const.MIN_CLONE_HP_MODIFIER, Const.MAX_CLONE_HP_MODIFIER);
        if (this.hp_to_clone < Const.MIN_BOT_HP_TO_CLONE_LIMIT) {
            this.hp_to_clone = Const.MIN_BOT_HP_TO_CLONE_LIMIT;
        }
    }

    mutateBrain() {
        this.brain[Util.rand(0, this.brain.length - 1)] = this.getRandCommand();
    }

    mutateParams() {
        this.params[Util.rand(0, this.params.length - 1)] = Util.rand(Const.MIN_BOT_PARAMS_VALUE, Const.MAX_BOT_PARAMS_VALUE);
    }
}