const COMMAND_MOVE = 1;

const COMMAND_LOOK = 2;

const COMMAND_TURN = 3;

const COMMAND_EAT = 4;

const COMMAND_SLEEP = 5;

const COMMAND_GIVE_ENERGY = 6;

const COMMAND_HP_LOWER = 7;

const COMMAND_HP_BIGGER = 8;

const COMMAND_CLONE = 9;

const COMMAND_GOTO = 20;

const COMMANDS = [
    COMMAND_MOVE,
    COMMAND_EAT,
    COMMAND_LOOK,
    COMMAND_SLEEP,
    COMMAND_TURN,
    COMMAND_GIVE_ENERGY,
    COMMAND_HP_LOWER,
    COMMAND_HP_BIGGER,
    COMMAND_CLONE,
    COMMAND_GOTO,
];

const COMMAND_AMOUNT = 128;

const DIRECTION_UP = 0;
const DIRECTION_RIGHT = 2;
const DIRECTION_DOWN = 4;
const DIRECTION_LEFT = 6;

const DIRECTIONS = [DIRECTION_UP, DIRECTION_RIGHT, DIRECTION_DOWN, DIRECTION_LEFT];

const CELL_TYPE_EMPTY = 0;
const CELL_TYPE_WALL = 1;
const CELL_TYPE_BOT = 2;
const CELL_TYPE_DEAD = 3;

let CELL_COLORS = {};
CELL_COLORS[CELL_TYPE_EMPTY] = '#fff';
CELL_COLORS[CELL_TYPE_BOT] = '#3e51dd';
CELL_COLORS[CELL_TYPE_WALL] = '#a3a0a0';
CELL_COLORS[CELL_TYPE_DEAD] = '#777';

const BOT_PERCENT = 0.1;
const EMPTY_PERCENT = 0.6;

const CELL_WIDTH = 10;
const CELL_HEIGHT = 10;

const STATE_PAUSE = 'pause';
const STATE_PLAY = 'play';

export default class Const {
    static get COMMAND_MOVE() { return COMMAND_MOVE; }
    static get COMMAND_LOOK() { return COMMAND_LOOK; }
    static get COMMAND_TURN() { return COMMAND_TURN; }
    static get COMMAND_EAT() { return COMMAND_EAT; }
    static get COMMAND_SLEEP() { return COMMAND_SLEEP; }
    static get COMMAND_GIVE_ENERGY() { return COMMAND_GIVE_ENERGY; }
    static get COMMAND_HP_LOWER() { return COMMAND_HP_LOWER; }
    static get COMMAND_HP_BIGGER() { return COMMAND_HP_BIGGER; }
    static get COMMAND_CLONE() { return COMMAND_CLONE; }
    static get COMMAND_GOTO() { return COMMAND_GOTO; }

    static get COMMANDS() { return COMMANDS; }

    static get COMMAND_AMOUNT() { return COMMAND_AMOUNT; }

    static get DIRECTION_UP() { return DIRECTION_UP; }
    static get DIRECTION_RIGHT() { return DIRECTION_RIGHT; }
    static get DIRECTION_DOWN() { return DIRECTION_DOWN; }
    static get DIRECTION_LEFT() { return DIRECTION_LEFT; }
    static get DIRECTIONS() { return DIRECTIONS; }

    static get BRAIN_CAPACITY() { return 128; }

    static get WORLD_WIDTH() { return 64; }
    static get WORLD_HEIGHT() { return 64; }

    static get CELL_TYPE_EMPTY() { return CELL_TYPE_EMPTY; }
    static get CELL_TYPE_WALL() { return CELL_TYPE_WALL; }
    static get CELL_TYPE_BOT() { return CELL_TYPE_BOT; }
    static get CELL_TYPE_DEAD() { return CELL_TYPE_DEAD; }

    static get CELL_COLORS() { return CELL_COLORS; }

    static get BOT_PERCENT() { return BOT_PERCENT; }
    static get EMPTY_PERCENT() { return EMPTY_PERCENT; }

    static get CELL_WIDTH() { return CELL_WIDTH; }
    static get CELL_HEIGHT() { return CELL_HEIGHT; }

    static get STATE_PAUSE() { return STATE_PAUSE; }
    static get STATE_PLAY() { return STATE_PLAY; }

    static get DEAD_AGE_TO_DEAD() { return 300; }

    static get LOOP_INTERVAL() { return 20; }
}