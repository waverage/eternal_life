<template>
    <div id="game_toolbar">
        <button id="btn_play">Play</button> |
        <button id="btn_stop">Stop</button> |
        <button id="btn_next">Next</button> |
        <span>Iteration: <span id="iteration_label"></span></span> |
        <span>Generation: <span id="generation_label"></span></span> |
        <span>Count bots: <span id="bots_count_label"></span></span>
    </div>
</template>

<script>
    export default {
        name: "ToolBar"
    }
</script>

<style scoped>
    #game_toolbar {
        height: 40px;
        margin-left: 5px;
    }
</style>