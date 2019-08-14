<template>
    <div class="canvas-wrapper">
        <canvas id="game_canvas" width="1560" height="720" style="border:1px solid red;"></canvas>
    </div>
</template>

<script>
    export default {
        name: "GameField"
    }
</script>

<style scoped>
    #game_canvas {
    }

    .canvas-wrapper {
        height: 100%;
        /*display: flex;*/
        /*flex-direction: column;*/
        /*flex-shrink: 0;*/
        -ms-flex: 1;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
    }
</style>