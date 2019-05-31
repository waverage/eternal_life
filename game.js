class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.density = 5;
        this.toolbarWrap = document.getElementById('game_toolbar');
        this.state = Const.STATE_PAUSE;
        this.camera = new Camera(this);
        this.frameId = null;
        this.runtime = new Runtime();
        this.iterationLabel = document.getElementById('iteration_label');
        this.generationLabel = document.getElementById('generation_label');
        this.botsCountLabel = document.getElementById('bots_count_label');
    }

    init() {
        // Load settings from inputs
        this.density = 10;//parseInt(document.getElementById('density').value);

        // Resize canvas
        this.canvas.width = document.body.clientWidth - 10;
        this.canvas.height = document.body.clientHeight - this.toolbarWrap.clientHeight - 10;

        this.runtime.init(this.density);

        // Init some handlers
        document.body.addEventListener('onresize', this.resizeHandler);

        // Buttons handlers
        document.getElementById('btn_play').addEventListener('click', this.play());
        document.getElementById('btn_stop').addEventListener('click', this.stop());
        document.getElementById('btn_next').addEventListener('click', this.next());
    }

    resizeHandler() {
        this.canvas.width = document.body.clientWidth - 15;
        this.canvas.height = document.body.clientHeight - this.toolbarWrap.clientHeight - 20;
    }

    play() {
        let that = this;
        return () => {
            if (that.state === Const.STATE_PLAY) {
                return;
            }
            that.state = Const.STATE_PLAY;
            that.frameId = setTimeout(that.loop(), 100);
        };
    }

    stop() {
        let that = this;
        return () => {
            if (that.state === Const.STATE_PAUSE) {
                return;
            }
            that.state = Const.STATE_PAUSE;
            clearTimeout(that.frameId);
        };
    }

    next() {
        let that = this;
        return () => {
            that.runtime.step();
            that.renderStep();
        };
    }

    restart() {
        let that = this;
        return () => {
            that.state = Const.STATE_PAUSE;
            that.init();
            that.play();
        };
    }

    getCellColor(cellType) {
        return Const.CELL_COLORS[cellType];
    }

    renderStep() {
        let step = this.runtime.getStepResult();
        if (step === null || step.length === 0) {
            console.log('step is empty');
            return;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 0, Const.WORLD_WIDTH * Const.CELL_WIDTH  * 3, Const.WORLD_HEIGHT * Const.CELL_HEIGHT * 3);

        var cell_w = Const.CELL_WIDTH * this.camera.scale;
        var cell_h = Const.CELL_HEIGHT * this.camera.scale;

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

            this.ctx.fillStyle = bot.getColor();
            let cx = this.camera.x + (bot.x * cell_w) + 1;
            let cy = this.camera.y + (bot.y * cell_h + 1);
            let cw = cell_w - 2;
            let ch = cell_h - 2;

            this.ctx.fillRect(cx, cy, cw, ch);
        }
    }

    loop() {
        let that = this;

        return () => {
            that.runtime.step();
            that.renderStep();

            if (this.runtime.iteration % 20 === 0) {
                this.iterationLabel.innerText = this.runtime.iteration.toString();
                this.generationLabel.innerText = this.runtime.generation.toString();
                this.botsCountLabel.innerText = this.runtime.bots.length.toString();
            }

            that.frameId = setTimeout(that.loop(), Const.LOOP_INTERVAL);
        };
    }
}