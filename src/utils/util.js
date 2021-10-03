import Const from "../consts";

export default class Util {
    static rand(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }

    /*
        * R is direction:
        * 7 0 1
        * 6 B 2
        * 5 4 3
        * */
    static xyFromVector(x, y, r) {
        let xt = x;
        let yt = y;

        if (r === 7 || r === 0 || r === 1) {
            yt--;
            if (yt < 0) {
                // yt = Const.WORLD_HEIGHT - 1; // disable transition from top to bottom
                yt = 0;
            }
        }

        if (r === 5 || r === 4 || r === 3) {
            yt++;
            if (yt >= Const.WORLD_HEIGHT) {
                // yt = 0;
                yt = Const.WORLD_HEIGHT - 1;
            }
        }

        if (r === 7 || r === 6 || r === 5) {
            xt--;
            if (xt < 0) {
                xt = Const.WORLD_WIDTH - 1;
            }
        }

        if (r === 1 || r === 2 || r === 3) {
            xt++;
            if (xt >= Const.WORLD_WIDTH) {
                xt = 0;
            }
        }

        return {x: xt, y: yt};
    }

    static interpolateColor(start, end, percent) {
        let rr = end.r - start.r;
        let rp = rr / 100;
        let ro = start.r + Math.round(percent * rp);

        let gr = end.g - start.g;
        let gp = gr / 100;
        let go = start.g + Math.round(percent * gp);

        let br = end.b - start.b;
        let bp = br / 100;
        let bo = start.b + Math.round(percent * bp);

        return {
            r: ro,
            g: go,
            b: bo
        };
    }

    static shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        return arr;
    }

    static cellLabel(index) {
        switch (index) {
            case Const.CELL_TYPE_EMPTY:
                return 'empty';
            case Const.CELL_TYPE_DEAD:
                return 'dead';
            case Const.CELL_TYPE_WALL:
                return 'wall';
            case Const.CELL_TYPE_BOT:
                return 'bot';
        }
        return 'unknown';
    }
    
    static turnLabel(dir) {
        switch (dir) {
            case Const.DIRECTION_UP:
                return 'up';
            case Const.DIRECTION_DOWN:
                return 'down';
            case Const.DIRECTION_RIGHT:
                return 'right';
            case Const.DIRECTION_LEFT:
                return 'left';
        }

        return 'unknown dir';
    }

    static isset(object, path) {
        if (typeof object !== 'object' || object === null) {
            return false;
        }

        if (typeof path === 'number') {
            path = path.toString();
        }

        let parts;
        if (typeof path === 'string' || path instanceof String) {
            parts = [path];
        } else if (Array.isArray(path)) {
            parts = path;
        } else {
            return false;
        }

        var findPath = function (object, path) {
            let first = path.shift().toString();
            if (object === null || typeof object !== 'object' || typeof object[first] === 'undefined') {
                return false;
            }

            if (path.length <= 0) {
                return true;
            }

            return findPath(object[first], path);
        };

        return findPath(object, parts);
    }

    static empty(variable) {
        return (
            variable == undefined ||
            variable === '' ||
            variable === 0 ||
            variable === '0' ||
            variable === null ||
            variable === false ||
            (variable instanceof Array && variable.length === 0)
        );
    }
}