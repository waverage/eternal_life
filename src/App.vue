<template>
    <div id="app">
        <game-field></game-field>
        <tool-bar></tool-bar>
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
        this.game = new Game(this.canvas);
        this.game.init();
    },
    components: {
        GameField,
        ToolBar
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
