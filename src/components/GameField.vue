<template>
    <div class="canvas-wrapper">
        <canvas ref="canvas" id="game_canvas" :width="width" :height="height" @click="handleClick"></canvas>
    </div>
</template>

<script>
    export default {
        name: "GameField",
        props: {
            width: {
                type: Number,
                default: 1560,
            },
            height: {
                type: Number,
                default: 720,
            }
        },
        methods: {
            handleClick(e) {
                let offsetX = this.$refs.canvas.offsetLeft;
                let offsetY = this.$refs.canvas.offsetTop;
                //window.console.log('x', e.clientX, 'y', e.clientY, 'offsetX', offsetX, 'offsetY', offsetY);
                this.$emit('click', {
                    x: e.clientX - offsetX,
                    y: e.clientY - offsetY,
                });
            },
        },
    }
</script>

<style scoped>
    #game_canvas {
        border:1px solid red;
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