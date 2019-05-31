import Cell from "./cell";
import Const from "../consts";

export default class Dead extends Cell {
    constructor() {
        super();
        this.type = Const.CELL_TYPE_DEAD;
        this.age = 0;
    }
}