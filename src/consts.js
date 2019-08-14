const COMMAND_MOVE = 1;

const COMMAND_LOOK = 2;

const COMMAND_TURN = 3;

const COMMAND_EAT = 4;

const COMMAND_SLEEP = 5;

const COMMAND_GIVE_ENERGY = 6;

const COMMAND_HP_LOWER = 7;

const COMMAND_HP_BIGGER = 8;

const COMMAND_CLONE = 9;

const COMMAND_HAVE_SUN = 10;

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
    COMMAND_HAVE_SUN,
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

const AGE_COLORS = {
    start: {
        r: 70,
        g: 169,
        b: 28
    },
    end: {
        r: 213,
        g: 31,
        b: 31
    }
};

const ENERGY_COLORS = {
    start: {
        r: 204,
        g: 201,
        b: 124
    },
    end: {
        r: 255,
        g: 30,
        b: 30
    }
};

const SUNNER_COLORS = {
    start: {
        r: 226,
        g: 229,
        b: 184
    },
    end: {
        r: 239,
        g: 255,
        b: 0
    }
};

const KILLER_COLORS = {
    start: {
        r: 255,
        g: 153,
        b: 114
    },
    end: {
        r: 250,
        g: 12,
        b: 0
    }
};

const BOT_PERCENT = 0.1;
const EMPTY_PERCENT = 0.6;

const CELL_WIDTH = 10;
const CELL_HEIGHT = 10;

const STATE_PAUSE = 'pause';
const STATE_PLAY = 'play';

const EAT_BOT_REWARD = 30;
const EAT_DEAD_REWARD = 15;

const SUN_ENERGY_REWARD_COEFICIENT = 25;

const DEFAULT_MIN_HP_TO_CLONE = 100;
const DEFAULT_MAX_HP_TO_CLONE = 300;

const DEFAULT_MIN_BOT_HP = 80;
const DEFAULT_MAX_BOT_HP = 200;

const MIN_BOT_HP_TO_CLONE_LIMIT = 20;

const MIN_CLONE_HP_MODIFIER = -10;
const MAX_CLONE_HP_MODIFIER = 10;

const MIN_BOT_PARAMS_VALUE = 0;
const MAX_BOT_PARAMS_VALUE = 512;

const MUTATE_BRAIN_TRIGGER_VALUE = 0.05;
const MUTATE_PARAMS_TRIGGER_VALUE = 0.2;

const BOT_FORCE_CLONE_COEFICIENT = 3;
const BOT_FORCE_CLONE_RAND_VALUE = 0.2;

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
    static get COMMAND_HAVE_SUN() { return COMMAND_HAVE_SUN; }
    static get COMMAND_GOTO() { return COMMAND_GOTO; }

    static get COMMANDS() { return COMMANDS; }

    static get COMMAND_AMOUNT() { return COMMAND_AMOUNT; }

    static get DIRECTION_UP() { return DIRECTION_UP; }
    static get DIRECTION_RIGHT() { return DIRECTION_RIGHT; }
    static get DIRECTION_DOWN() { return DIRECTION_DOWN; }
    static get DIRECTION_LEFT() { return DIRECTION_LEFT; }
    static get DIRECTIONS() { return DIRECTIONS; }

    static get BRAIN_CAPACITY() { return 128; }

    static get WORLD_WIDTH() { return 100; }
    static get WORLD_HEIGHT() { return 100; }

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

    static get DEAD_AGE_TO_DEAD() { return 400; }

    static get VIEW_MODE_DEFAULT() { return 0; }
    static get VIEW_MODE_ENERGY() { return 1; }
    static get VIEW_MODE_AGE() { return 2; }

    static get AGE_COLORS() { return AGE_COLORS; }
    static get ENERGY_COLORS() { return ENERGY_COLORS; }

    static get SUNNER_COLORS() { return SUNNER_COLORS; }
    static get KILLER_COLORS() { return KILLER_COLORS; }

    static get EAT_BOT_REWARD() { return EAT_BOT_REWARD; }
    static get EAT_DEAD_REWARD() { return EAT_DEAD_REWARD; }

    static get SUN_ENERGY_REWARD_COEFICIENT() { return SUN_ENERGY_REWARD_COEFICIENT; }

    static get DEFAULT_MIN_HP_TO_CLONE() { return DEFAULT_MIN_HP_TO_CLONE; }
    static get DEFAULT_MAX_HP_TO_CLONE() { return DEFAULT_MAX_HP_TO_CLONE; }

    static get DEFAULT_MIN_BOT_HP() { return DEFAULT_MIN_BOT_HP; }
    static get DEFAULT_MAX_BOT_HP() { return DEFAULT_MAX_BOT_HP; }

    static get MIN_BOT_HP_TO_CLONE_LIMIT() { return MIN_BOT_HP_TO_CLONE_LIMIT; }

    static get MIN_BOT_PARAMS_VALUE() { return MIN_BOT_PARAMS_VALUE; }
    static get MAX_BOT_PARAMS_VALUE() { return MAX_BOT_PARAMS_VALUE; }

    static get MUTATE_BRAIN_TRIGGER_VALUE() { return MUTATE_BRAIN_TRIGGER_VALUE; }
    static get MUTATE_PARAMS_TRIGGER_VALUE() { return MUTATE_PARAMS_TRIGGER_VALUE; }

    static get MIN_CLONE_HP_MODIFIER() { return MIN_CLONE_HP_MODIFIER; }
    static get MAX_CLONE_HP_MODIFIER() { return MAX_CLONE_HP_MODIFIER; }

    static get BOT_FORCE_CLONE_COEFICIENT() { return BOT_FORCE_CLONE_COEFICIENT; }
    static get BOT_FORCE_CLONE_RAND_VALUE() { return BOT_FORCE_CLONE_RAND_VALUE; }
}