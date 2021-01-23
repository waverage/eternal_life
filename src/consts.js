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

const COMMAND_SAY = 11;

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
    // COMMAND_HAVE_SUN,
    COMMAND_SAY,
    COMMAND_GOTO,
];

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

// rgb(70,169,28)
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

const BOT_PERCENT = 0.01;
const EMPTY_PERCENT = 0.6;

const CELL_WIDTH = 10;
const CELL_HEIGHT = 10;

const STATE_PAUSE = 'pause';
const STATE_PLAY = 'play';

const HP_TO_CLONE = 300;

const DEFAULT_MIN_BOT_HP = 200;
const DEFAULT_MAX_BOT_HP = 600;

const MIN_BOT_HP_TO_CLONE_LIMIT = 20;

const MIN_CLONE_HP_MODIFIER = -10;
const MAX_CLONE_HP_MODIFIER = 10;

const MIN_BOT_PARAMS_VALUE = 0;
const MAX_BOT_PARAMS_VALUE = 512;

const MUTATE_BRAIN_TRIGGER_VALUE = 0.001;
const MUTATE_PARAMS_TRIGGER_VALUE = 0.001;

const BOT_FORCE_CLONE_COEFICIENT = 1;
const BOT_FORCE_CLONE_RAND_VALUE = 0.2;

const DEAD_AGE_TO_DEAD = 1000;

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 50;

const GAME_TICK_DURATION = 50;

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
    static get COMMAND_SAY() { return COMMAND_SAY; }
    static get COMMAND_GOTO() { return COMMAND_GOTO; }

    static get COMMANDS() { return COMMANDS; }

    static get COMMAND_AMOUNT() { return 64; }

    static get DIRECTION_UP() { return DIRECTION_UP; }
    static get DIRECTION_RIGHT() { return DIRECTION_RIGHT; }
    static get DIRECTION_DOWN() { return DIRECTION_DOWN; }
    static get DIRECTION_LEFT() { return DIRECTION_LEFT; }
    static get DIRECTIONS() { return DIRECTIONS; }

    static get BRAIN_CAPACITY() { return 64; }

    static get WORLD_WIDTH() { return WORLD_WIDTH; }
    static get WORLD_HEIGHT() { return WORLD_HEIGHT; }

    static get GAME_TICK_DURATION() { return GAME_TICK_DURATION; }

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

    static get DEAD_AGE_TO_DEAD() { return DEAD_AGE_TO_DEAD; }

    static get VIEW_MODE_DEFAULT() { return 0; }
    static get VIEW_MODE_ENERGY() { return 1; }
    static get VIEW_MODE_AGE() { return 2; }

    static get GAME_MODE_PLAY() { return 0; }
    static get GAME_MODE_EDITOR() { return 1; }

    static get AGE_COLORS() { return AGE_COLORS; }
    static get ENERGY_COLORS() { return ENERGY_COLORS; }

    static get SUNNER_COLORS() { return SUNNER_COLORS; }
    static get KILLER_COLORS() { return KILLER_COLORS; }

    static get EAT_BOT_REWARD() { return 10; }
    static get EAT_DEAD_REWARD() { return 30; }

    static get SUN_ENERGY_REWARD_COEFICIENT() { return 2; }

    static get HP_TO_CLONE() { return HP_TO_CLONE; }

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

    static get BOT_TYPE_DEFAULT () { return 0; }
    static get BOT_TYPE_CUSTOM () { return 1; }

    static get COMMANDS_NAMES () {
        let obj = {};
        obj[COMMAND_MOVE] = 'move';
        obj[COMMAND_LOOK] = 'look';
        obj[COMMAND_TURN] = 'turn';
        obj[COMMAND_EAT] = 'eat';
        obj[COMMAND_SLEEP] = 'sleep';
        obj[COMMAND_GIVE_ENERGY] = 'give_energy';
        obj[COMMAND_HP_LOWER] = 'hp_is_lower';
        obj[COMMAND_HP_BIGGER] = 'hp_is_bigger';
        obj[COMMAND_CLONE] = 'clone';
        obj[COMMAND_HAVE_SUN] = 'have_sun';
        obj[COMMAND_SAY] = 'say';
        obj[COMMAND_GOTO] = 'goto';
        return obj;
    }
}