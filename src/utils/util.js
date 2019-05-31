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
                yt = Const.WORLD_HEIGHT - 1;
            }
        }

        if (r === 5 || r === 4 || r === 3) {
            yt++;
            if (yt >= Const.WORLD_HEIGHT) {
                yt = 0;
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
}