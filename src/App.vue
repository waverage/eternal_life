<template>
    <div id="app">
        <play-mode
            v-if="gameMode === 'play'"
            @open-editor-mode="switchGameMode('editor')"
        ></play-mode>
        <editor-mode
            v-if="gameMode === 'editor'"
            @switch-mode="switchGameMode"
        >
        </editor-mode>
    </div>
</template>

<script>
import PlayMode from './PlayMode.vue';
import EditorMode from './EditorMode.vue';

export default {
    name: 'app',
    data: () => {
        return {
            gameMode: 'play',
        };
    },
    mounted() {

    },
    methods: {
        switchGameMode(mode) {
            this.gameMode = mode;
        }
    },
    computed: {
       
    },
    components: {
        PlayMode,
        EditorMode,
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
