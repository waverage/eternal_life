import Const from "../consts";

const MIN_SCALE = 0.01;
const MAX_SCALE = 10;

export default class Camera {
    constructor(game) {
        this.game = game;
        this.canvas = game.canvas;

        this.initScaleAndPosition();
        this.prevMousePos = {x: 0, y: 0};
        this.isDrag = false;

        this.canvas.addEventListener('mousedown', this.canvasDown());
        this.canvas.addEventListener('mousemove', this.canvasMove());
        this.canvas.addEventListener('mouseup', this.canvasUp());
        this.canvas.addEventListener('mousewheel', this.canvasScroll());
    }

    initScaleAndPosition() {
        let worldWidth = Const.WORLD_WIDTH * Const.CELL_WIDTH;
        let worldHeight = Const.WORLD_HEIGHT * Const.CELL_HEIGHT;

        this.x = 20;
        this.y = 20;
        let widthScale = (this.canvas.width - 40) / worldWidth;
        let heightScale = (this.canvas.height - 40) / worldHeight;

        this.scale = widthScale > heightScale ? heightScale : widthScale;

        if (widthScale > heightScale) {
            // Align by x
            this.x = Math.round((this.canvas.width - (worldWidth * this.scale)) / 2);
        } else {
            // Align by y
            this.y = Math.round((this.canvas.height - (worldHeight * this.scale)) / 2);
        }
    }

    canvasDown() {
        let that = this;
        return (e) => {
            that.isDrag = true;
            let bound = that.canvas.getBoundingClientRect();
            that.prevMousePos.x = e.clientX - bound.x;
            that.prevMousePos.y = e.clientY - bound.y;
        };
    }

    canvasUp() {
        let that = this;
        return () => {
            that.isDrag = false;
        };
    }

    canvasMove() {
        let that = this;
        return (e) => {
            if (that.isDrag) {
                let bound = that.canvas.getBoundingClientRect();
                let relative_x = e.clientX - bound.x;
                let relative_y = e.clientY - bound.y;
                let diff_x = relative_x - that.prevMousePos.x;
                let diff_y = relative_y - that.prevMousePos.y;
                that.x += diff_x;
                that.y += diff_y;
                that.prevMousePos.x = relative_x;
                that.prevMousePos.y = relative_y;

                that.game.renderStep();
            }
        };
    }

    canvasScroll() {
        let that = this;
        return (e) => {
            that.scale += (e.deltaY || e.detail || e.wheelDelta) * -1 / 4000;
            that.game.renderStep();
        };
    }
}