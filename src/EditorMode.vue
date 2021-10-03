<template>
<div id="editor_mode_wrapper">
    <div class="left-side">
        <game-field :width="400" @click="handleClick"></game-field>
        <editor-toolbar
            :selected-tool="selectedTool"
            :is-play="isPlay"
            @next-frame="next"
            @select-tool="selectToolHandler"
            @play="play"
            @pause="stop"
        ></editor-toolbar>
    </div>
    <brain-editor ref="editor" @change-bot="onChangeBot">
    </brain-editor>
</div>
</template>

<script>
import GameField from "./components/GameField";
import EditorToolbar from "./components/EditorToolbar";
import BrainEditor from "./components/BrainEditor";
import Game from "./base/game";

export default {
    name: "EditorMode",
    data() {
        return {
            canvas: null,
            game: null,
            selectedTool: 'add',
            isPlay: false,
            selectedBot: null,
        };
    },
    mounted() {
        this.canvas = document.getElementById('game_canvas');
        this.game = new Game();
        this.game.init({
            canvas: this.canvas,
            worldWidth: 20,
            worldHeight: 20,
            gameType: 'editor',
        });
    },
    methods: {
        selectToolHandler(tool) {
            window.console.log('select tool', tool);
            this.selectedTool = tool;
        },
        handleClick(position) {
            if (this.selectedTool === 'edit') {
                window.console.log('position', position);
                let bot = this.game.getBotByXY(position);
                this.selectedBot = bot;
                window.console.log('bot', bot);

                if (bot !== null) {
                    this.$refs.editor.setBot(bot);
                }
                return;
            }

            if (this.selectedTool === 'add') {
                let bot = this.game.addBotToPosition(position);
                if (bot !== null) {
                    this.selectedBot = bot;
                    this.$refs.editor.setBot(bot);
                }
                return;
            }

            if (this.selectedTool === 'delete') {
                if (this.game.isBotSelectedByPosition(position)) {
                    this.$refs.editor.setBot(null);
                }

                this.game.deleteBotByPosition(position);
            }
        },
        play() {
            this.isPlay = true;
            this.game.play();
        },
        stop() {
            this.isPlay = false;
            this.game.stop();
        },
        next() {
            this.game.next();

            if (this.selectedBot !== null) {
                this.selectedBot = this.game.getBotByInnerXY(this.selectedBot.x, this.selectedBot.y);
                if (this.selectedBot !== null) {
                    this.$refs.editor.setBot(this.selectedBot);
                }
            }
        },
        changeViewMode(mode) {
            this.game.changeViewMode(mode);
        },
        clearAll() {
            this.game.clearAll();
        },
        addBotHandler() {
            this.game.addBot();
        },
        onChangeBot(bot) {
            window.console.log('on change bot', bot);
            this.game.updateBotInPosition({x: bot.x, y: bot.y}, bot);
        },
    },
    components: {
        GameField,
        EditorToolbar,
        BrainEditor,
    }
}
</script>

<style scoped>
#editor_mode_wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.left-side {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.left-side .canvas-wrapper {

}
</style>