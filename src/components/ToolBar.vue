<template>
    <div id="game_toolbar">
        <div class="controls">
            <div class="btn-group">
                <button @click="playHandler" id="btn_play" class="btn" :style="playStyles">Play</button>
                <button @click="stopHandler" id="btn_stop" class="btn">Stop</button>
                <button @click="nextHandler" id="btn_next" class="btn">Next</button>
            </div>
            <div class="btn-group">
                Speed: <input
                            v-model="speed"
                            type="range"
                            id="speed"
                            class="range-input"
                            name="volume"
                            min="1"
                            max="200"> {{ speed }}
            </div>

            <div class="btn-group">
                View mode:
                <select v-model="view_mode">
                    <option value="0">Default</option>
                    <option value="1">Energy</option>
                    <option value="2">Age</option>
                </select>
            </div>

            <div class="btn-group">
                <button @click="clearAllHandler" id="btn_clear_all" class="btn">Clear all</button>
            </div>
            <div class="btn-group">
                <button @click="addBotHandler" id="btn_add_bot" class="btn">Add bot</button>
            </div>
        </div>
        <div class="info-block">
            <div class="row">
                <span>Iteration: <span id="iteration_label">{{ iteration }}</span></span>
            </div>
            <div class="row">
                <span>Generation: <span id="generation_label">{{ generation }}</span></span>
            </div>
            <div class="row">
                <span>Count bots: <span id="bots_count_label">{{ countBots }}</span></span>
            </div>
            <div class="row">
                <span>Max generation: <span id="max_bot_generation_label">{{ maxGeneration }}</span></span>
            </div>
            <div class="row">
                <span>Max age: <span id="max_age_label">{{ maxAge }}</span></span>
            </div>
        </div>

        <div class="btn-group game-mode-switcher">
            Game mode:
            <select v-model="game_mode">
                <option value="0">Play</option>
                <option value="1">Editor</option>
            </select>
        </div>
    </div>
</template>

<script>
    import Const from "./../consts";
    import Util from "../utils/util";

    export default {
        name: "ToolBar",
        data: () => {
            return {
                speed: 10,
                view_mode: 0,
                game_mode: 0,
                color: {
                    r: 250,
                    g: 0,
                    b: 0
                }
            };
        },
        props: {
            'iteration': Number,
            'generation': Number,
            'countBots': Number,
            'maxGeneration': Number,
            'maxAge': Number,
        },
        methods: {
            speedChanged() {
                this.$emit('speed-changed', this.speed);

                let min = 1;
                let max = 200;
                let range = max - min;
                let p = range / 100;
                let curr = (this.speed / p);

                this.color = Util.interpolateColor(Const.AGE_COLORS.start, Const.AGE_COLORS.end, curr);
            },
            viewModeChanged() {
                this.$emit('view-mode-changed', this.view_mode);
            },
            gameModeChanged() {
                this.$emit('game-mode-changed', this.game_mode);
            },
            playHandler() {
                this.$emit('play-clicked');
            },
            stopHandler() {
                this.$emit('stop-clicked');
            },
            nextHandler() {
                this.$emit('next-clicked');
            },
            clearAllHandler() {
                this.$emit('clear-all');
            },
            addBotHandler() {
                this.$emit('add-bot');
            },
        },
        computed: {
            playStyles() {
                return {
                    'background-color': 'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')',
                };
            }
        },
        watch: {
            speed: 'speedChanged',
            view_mode: 'viewModeChanged',
            game_mode: 'gameModeChanged'
        }
    }
</script>

<style scoped>
    #game_toolbar {
        width: 250px;
        max-width: 300px;
        background: #ccc;
        height: 100%;
        -ms-flex: 0 100px;
        -webkit-box-flex:  0;
        -moz-box-flex:  0;
        padding: 10px;
        position: relative;
    }

    .controls {
        margin-bottom: 30px;
    }

    .row {
        margin: 10px 0;
    }

    .range-input {
        display: inline-block;
        margin: 5px 0 0 0;
    }

    .game-mode-switcher {
        position: absolute;
        bottom: 10px;
        left: 10px;
    }
</style>