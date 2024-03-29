import Camera from "./camera";
import Const from "../consts";
import Runtime from "./runtime";
import Util from "../utils/util";

export default class Game {
    constructor() {
        this.toolbarWrap = document.getElementById('game_toolbar');
        this.state = Const.STATE_PAUSE;
        this.frameId = null;
        this.runtime = new Runtime();
        this.speed = 10;
        this.view_mode = Const.VIEW_MODE_DEFAULT;
        this.game_mode = Const.GAME_MODE_PLAY;
        this.lastTick = performance.now();
        this.lastRender = this.lastTick;
        this.tickLength = Const.GAME_TICK_DURATION;
    }

    init(config) {
        this.canvas = config.canvas;
        this.ctx = this.canvas.getContext('2d');

        this.config = config;
        this.camera = new Camera(this, {
            worldWidth: config.worldWidth,
            worldHeight: config.worldHeight,
        });
        this.speed = 10;

        this.runtime.init(config);

        this.renderStep();
    }

    getInnerPositionByMousePos(position) {
        let x = (position.x - this.camera.x);
        let y = (position.y - this.camera.y);
        let cellW = Const.CELL_WIDTH * this.camera.scale;
        let cellH = Const.CELL_HEIGHT * this.camera.scale;
        let tx = Math.floor(x / cellW);
        let ty = Math.floor(y / cellH);

        return {x: tx, y: ty};
    }

    isBotSelectedByPosition(position) {
        let innerPosition = this.getInnerPositionByMousePos(position);
        return this.runtime.isBotSelectedByPosition(innerPosition);
    }

    deleteBotByPosition(position) {
        let innerPosition = this.getInnerPositionByMousePos(position);
        this.runtime.deleteBotByXY(innerPosition.x, innerPosition.y);
        this.renderStep();
    }

    addBotToPosition(position) {
        let innerPosition = this.getInnerPositionByMousePos(position);
        let bot = this.runtime.addBotToPosition(innerPosition.x, innerPosition.y);
        this.renderStep();

        return bot;
    }

    updateBotInPosition(position, bot) {
        this.runtime.setBotByXY(position.x, position.y, bot);
    }

    getBotByXY(position) {
        let innerPosition = this.getInnerPositionByMousePos(position);
        window.console.log('x index', innerPosition.x, 'y index', innerPosition.y);
        let bot = this.runtime.selectBotByXY(innerPosition.x, innerPosition.y);
        if (bot) {
            this.renderStep();
        }

        return bot;
    }

    getBotByInnerXY(x, y) {
        return this.runtime.selectBotByXY(x, y);
    }

    changeViewMode(mode) {
        this.view_mode = parseInt(mode);
    }

    changeGameMode(mode) {
        this.game_mode = parseInt(mode);
    }

    play() {
        if (this.state === Const.STATE_PLAY) {
            return;
        }
        this.lastTick = performance.now();
        this.lastRender = this.lastTick;
        this.state = Const.STATE_PLAY;
        this.frameId = this.loop(this)(performance.now());
    }

    stop() {
        if (this.state === Const.STATE_PAUSE) {
            return;
        }
        this.state = Const.STATE_PAUSE;
        window.cancelAnimationFrame(this.frameId);
    }

    next() {
        this.runtime.step();
        this.renderStep();
    }

    restart() {
        let that = this;
        return () => {
            that.state = Const.STATE_PAUSE;
            that.init();
            that.play();
        };
    }

    clearAll() {
        this.runtime.killAllBots();
        this.runtime.countBots = 0;
        this.runtime.iteration = 0;
        this.runtime.generation = 0;
        this.runtime.maxGeneration = 0;
        this.runtime.maxAge = 0;
        this.stop();
        // Need for rerender game field
        this.next();
    }

    addBot() {
        this.runtime.addBot();
    }

    getCellColor(cellType) {
        return Const.CELL_COLORS[cellType];
    }

    getBotColor(bot) {
        let botKills = bot.kill_score * 10;
        switch (this.view_mode) {
            case Const.VIEW_MODE_DEFAULT: {
                if (bot.type === Const.BOT_TYPE_CUSTOM) {
                    bot.color = {
                        r: 0,
                        g: 0,
                        b: 255
                    };
                    break;
                }

                if (botKills > bot.sun_energy) {
                    // Killer
                    let min = 1;
                    let max = 100;
                    let range = max - min;
                    let p = range / 100;
                    let curr = (bot.kill_score / p);

                    bot.color = Util.interpolateColor(Const.KILLER_COLORS.start, Const.KILLER_COLORS.end, curr);
                } else {
                    // Sunner
                    let min = 1;
                    let max = 200;
                    let range = max - min;
                    let p = range / 100;
                    let curr = (bot.sun_energy / p);

                    bot.color = Util.interpolateColor(Const.SUNNER_COLORS.start, Const.SUNNER_COLORS.end, curr);
                }
                break;
            }
            case Const.VIEW_MODE_AGE: {
                let min = 0;
                let max = 500;
                let range = max - min;
                let p = range / 100;
                let curr = (bot.age / p);

                // console.log('bot age', bot.age, 'curr age val', curr);

                bot.color = Util.interpolateColor(Const.AGE_COLORS.start, Const.AGE_COLORS.end, curr);
                break;
            }
            case Const.VIEW_MODE_ENERGY: {
                let emin = 0;
                let emax = bot.hp_to_clone * 3;
                let erange = emax - emin;
                let ep = erange / 100;
                let ecurr = (bot.age / ep);

                bot.color = Util.interpolateColor(Const.ENERGY_COLORS.start, Const.ENERGY_COLORS.end, ecurr);
                break;
            }
        }

        return 'rgb(' + bot.color.r + ',' + bot.color.g + ',' + bot.color.b + ')';
    }

    renderStep() {
        let step = this.runtime.getStepResult();
        if (step === null || step.length === 0) {
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let cell_w = Const.CELL_WIDTH * this.camera.scale;
        let cell_h = Const.CELL_HEIGHT * this.camera.scale;

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'yellow';
        this.ctx.moveTo(this.camera.x, this.camera.y + (this.runtime.MAX_Y_FOR_SUN * cell_h));
        this.ctx.lineTo(this.camera.x + (this.config.worldWidth * cell_w), this.camera.y + (this.runtime.MAX_Y_FOR_SUN * cell_h));
        this.ctx.stroke();

        for (let y = 0; y < step.length; y++) {
            for (let x = 0; x < step[y].length; x++) {
                let cellType = this.runtime.getCellType(step[y][x]);
                if (cellType !== Const.CELL_TYPE_EMPTY && cellType !== Const.CELL_TYPE_BOT) {
                    this.ctx.fillStyle = this.getCellColor(cellType);
                    let cx = this.camera.x + (x * cell_w) + 1;
                    let cy = this.camera.y + (y * cell_h + 1);
                    let cw = cell_w - 2;
                    let ch = cell_h - 2;

                    this.ctx.fillRect(cx, cy, cw, ch);
                }
            }
        }

        for (let i = 0; i < this.runtime.bots.length; i++) {
            if (this.runtime.bots[i] === null) {
                continue;
            }

            let bot = this.runtime.bots[i];
            this.ctx.fillStyle = this.getBotColor(bot);
            let cx = this.camera.x + (bot.x * cell_w) + 1;
            let cy = this.camera.y + (bot.y * cell_h + 1);
            let cw = cell_w - 2;
            let ch = cell_h - 2;

            this.ctx.fillRect(cx, cy, cw, ch);

            if (bot.selected) {
                // Render selected style
                this.ctx.beginPath();
                this.ctx.strokeStyle = 'red';
                this.ctx.moveTo(cx-1, cy-1);
                this.ctx.lineTo(cx+cw+1, cy-1);
                this.ctx.lineTo(cx+cw+1, cy+ch+1);
                this.ctx.lineTo(cx-1, cy+ch+1);
                this.ctx.lineTo(cx-1, cy-1);
                this.ctx.stroke();

                this.renderDirection(bot, cx, cy, cw, ch);
            }
        }
    }

    renderDirection(bot, cx, cy, cw, ch) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'white';

        switch (bot.direction) {
            case Const.DIRECTION_UP: {
                this.ctx.moveTo(cx+(cw / 2), cy+ch - 2);
                this.ctx.lineTo(cx+(cw / 2), cy+2);
                this.ctx.lineTo(cx+(cw / 2) - 3, cy+6);
                this.ctx.moveTo(cx+(cw / 2), cy+2);
                this.ctx.lineTo(cx+(cw / 2) + 3, cy+6);
                this.ctx.stroke();
                break;
            }
            case Const.DIRECTION_DOWN: {
                this.ctx.moveTo(cx+(cw / 2), cy+1);
                this.ctx.lineTo(cx+(cw / 2), cy+ch-2);
                this.ctx.lineTo(cx+(cw / 2) - 3, cy+ch-6);
                this.ctx.moveTo(cx+(cw / 2), cy+ch-2);
                this.ctx.lineTo(cx+(cw / 2) + 3, cy+ch-6);
                this.ctx.stroke();
                break;
            }
            case Const.DIRECTION_LEFT: {
                this.ctx.moveTo(cx+cw-2, cy+(ch / 2));
                this.ctx.lineTo(cx+2, cy+(ch / 2));
                this.ctx.lineTo(cx+6, cy+(ch / 2) - 3);
                this.ctx.moveTo(cx+2, cy+(ch / 2));
                this.ctx.lineTo(cx+6, cy+(ch / 2) + 3);
                this.ctx.stroke();
                break;
            }
            case Const.DIRECTION_RIGHT: {
                this.ctx.moveTo(cx+2, cy+(ch / 2));
                this.ctx.lineTo(cx+cw-2, cy+(ch / 2));
                this.ctx.lineTo(cx+cw-6, cy+(ch / 2) - 3);
                this.ctx.moveTo(cx+cw-2, cy+(ch / 2));
                this.ctx.lineTo(cx+cw-6, cy+(ch / 2) + 3);
                this.ctx.stroke();
            }
        }
    }

    queueUpdates(numTicks) {
        numTicks = 1;
        for (let i=0; i < numTicks; i++) {
            this.lastTick = this.lastTick + this.tickLength;
            this.runtime.step();
        }
    }

    loop(game) {
        return (tFrame) => {
            game.frameId = window.requestAnimationFrame(game.loop(game));
            var nextTick = game.lastTick + game.tickLength;
            var numTicks = 0;
            
            if (tFrame > nextTick) {
                var timeSinceTick = tFrame - game.lastTick;
                numTicks = Math.floor(timeSinceTick / game.tickLength);
            }

            game.queueUpdates(numTicks);
            game.renderStep();
            game.lastRender = tFrame;

            if (game.runtime.iteration % 20 === 0) {
                game.runtime.countBots = game.runtime.bots.length;
            }
        };
    }
}