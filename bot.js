class Bot {
    constructor() {
        this.age = 0;
        this.hp = 200;
        this.x = 0;
        this.y = 0;
        this.direction = Const.DIRECTIONS[Util.rand(0, 3)];
        this.command_cursor = 0;
        this.brain = [];
        this.params = [];
        this.kill_score = 0;
        this.hp_to_clone = Util.rand(201, 300);
        this.color = {
            r: 62,
            g: 81,
            b: 221
        };
        this.debug = false;
        this.initBrain();
    }

    increaseCursor(value) {
        this.command_cursor += value;
        if (this.command_cursor >= Const.COMMAND_AMOUNT) {
            this.command_cursor = this.command_cursor - Const.COMMAND_AMOUNT;
        }
    }

    getRandCommand() {
        let command = Const.COMMANDS[Util.rand(0, COMMANDS.length - 1)];
        if (command === Const.COMMAND_GOTO) {
            command = Util.rand(Const.COMMAND_GOTO, Const.COMMAND_AMOUNT);
        }
        return command;
    }

    initBrain() {
        this.brain = [];
        this.params = [];

        for (let i = 0; i < Const.BRAIN_CAPACITY; i++) {
            this.params.push(Util.rand(0, 512));
            this.brain[i] = this.getRandCommand();
        }
    }

    mutateBrain(amount) {
        for (let i = 0; i < amount; i++) {
            this.brain[Util.rand(0, this.brain.length - 1)] = this.getRandCommand();
            this.params[Util.rand(0, this.params.length - 1)] = Util.rand(0, 512);
        }

        this.hp_to_clone += Util.rand(-10, 10);
    }

    getColor() {
        let r = this.kill_score > 255 ? 255 : this.kill_score;
        let n = Math.round(this.kill_score / 2);
        let g = this.color.g - n;
        if (g < 0) {
            g = 0;
        }

        let b = this.color.b - n;
        if (b < 0) {
            b = 0;
        }
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
}