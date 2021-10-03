<template>
    <div id="play_mode_wrapper">
        <game-field></game-field>
        <tool-bar
            ref="toolbar"
            @play-clicked="play"
            @stop-clicked="stop"
            @next-clicked="next"
            @speed-changed="changeSpeed"
            @view-mode-changed="changeViewMode"
            @game-mode-changed="changeGameMode"
            @clear-all="clearAll"
            @add-bot="addBotHandler"
            @open-editor-mode="openEditorMode"
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
import Const from "./consts";

export default {
    name: 'PlayMode',
    data: () => {
        return {
            canvas: null,
            game: null,
        };
    },
    mounted() {
        this.canvas = document.getElementById('game_canvas');
        this.game = new Game();
        let config = {
            canvas: this.canvas,
            worldWidth: Const.WORLD_WIDTH,
            worldHeight: Const.WORLD_HEIGHT,
            gameType: 'play',
        };
        this.game.init(config);

        // Resize canvas
        this.canvas.width = document.body.offsetWidth - this.$refs.toolbar.$el.offsetWidth - 1;
        this.canvas.height = document.body.clientHeight - 5;

        // Buttons handlers
        window.onresize = this.resizeHandler();
    },
    methods: {
        resizeHandler() {
            let that = this;
            return () => {
                that.canvas.width = document.body.offsetWidth - that.$refs.toolbar.offsetWidth - 1;
                that.canvas.height = document.body.clientHeight - 5;
            };
        },
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
            // this.game.changeGameMode(mode);
            this.$emit('change-game-mode', mode);
        },
        clearAll() {
            this.game.clearAll();
        },
        addBotHandler() {
            this.game.addBot();
        },
        openEditorMode() {
            this.$emit('open-editor-mode');
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
#play_mode_wrapper {
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
</style>
