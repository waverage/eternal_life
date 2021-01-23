<template>
    <div id="app">
        <game-field></game-field>
        <tool-bar
                @play-clicked="play"
                @stop-clicked="stop"
                @next-clicked="next"
                @speed-changed="changeSpeed"
                @view-mode-changed="changeViewMode"
                @game-mode-changed="changeGameMode"
                @clear-all="clearAll"
                @add-bot="addBotHandler"
                :iteration="getIteration"
                :generation="getGeneration"
                :max-generation="getMaxGeneration"
                :max-age="getMaxAge"
                :count-bots="getCountBots">
        </tool-bar>
    </div>
</template>

<script>
import ToolBar from "./components/ToolBar";
import GameField from "./components/GameField";
import Game from "./base/game";

export default {
    name: 'app',
    data: () => {
        return {
            canvas: null,
            game: null
        };
    },
    mounted() {
        this.canvas = document.getElementById('game_canvas');
        this.game = new Game();
        this.game.init(this.canvas);
    },
    methods: {
        play() {
            this.game.play();
        },
        stop() {
            this.game.stop();
        },
        next() {
            this.game.next();
        },
        changeSpeed(speed) {
            this.game.speed = speed;
        },
        changeViewMode(mode) {
            this.game.changeViewMode(mode);
        },
        changeGameMode(mode) {
            this.game.changeGameMode(mode);
        },
        clearAll() {
            this.game.clearAll();
        },
        addBotHandler() {
            this.game.addBot();
        },
    },
    computed: {
        getIteration() {
            if (this.game === null) {
                return 0;
            }

            return this.game.runtime.iteration;
        },
        getGeneration() {
            if (this.game === null) {
                return 0;
            }

            return this.game.runtime.generation;
        },
        getMaxGeneration() {
            if (this.game === null) {
                return 0;
            }

            return this.game.runtime.maxGeneration;
        },
        getMaxAge() {
            if (this.game === null) {
                return 0;
            }

            return this.game.runtime.maxAge;
        },
        getCountBots() {
            if (this.game === null) {
                return 0;
            }

            return this.game.runtime.countBots;
        },
    },
    components: {
        GameField,
        ToolBar
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}
html {
    height: 100%;
}
body {
    padding: 0;
    margin: 0;
    height: 100%;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: space-between;*/
    height: 100%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: box;

    -ms-flex-direction: row;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
}

.btn-group {
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
}

.btn {
    padding: 5px 10px;
    margin-right: 5px;
}
</style>
