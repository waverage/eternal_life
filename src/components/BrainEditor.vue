<template>
<div class="brain-editor">
    <div class="commands-list">
        <div
            v-for="(cell, index) in brainCells"
            :key="index"
            :class="{
                cell: true,
                active: cell.active,
            }"
            @click="clickOnCell(index, $event)"
        >
            <span class="cell-index">{{ index }}</span>
            <div v-if="activeCell === index" class="cell-command active">
                <input
                    ref="activeCommand"
                    type="text"
                    :value="formatCommandName(cell.command)"
                    class="cell-input"
                    @keyup="onChangeCommand">
                <input
                    ref="activeParam"
                    type="text"
                    :value="cell.param"
                    class="cell-input"
                    @keyup="onChangeCommand">
            </div>
            <div v-else class="cell-command">
                {{ formatCommandName(cell.command) }}
                <span class="cell-param">{{ cell.param }}</span>
            </div>
        </div>
    </div>

    <div class="editor-bottom">
        <div class="info">
            <table>
                <tr>
                    <th>Param</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Age</td>
                    <td>{{ bot.age }}</td>
                </tr>
                <tr>
                    <td>HP</td>
                    <td>{{ bot.hp }}</td>
                </tr>
                <tr>
                    <td>HP to clone</td>
                    <td>{{ bot.hp_to_clone }}</td>
                </tr>
                <tr>
                    <td>Generation</td>
                    <td>{{ bot.generation }}</td>
                </tr>
                <tr>
                    <td>Kills</td>
                    <td>{{ bot.kill_score }}</td>
                </tr>
                <tr>
                    <td>Sun energy</td>
                    <td>{{ bot.sun_energy }}</td>
                </tr>
            </table>
        </div>

        <div class="additional-buttons">
            <button @click="copyBotHandler">Copy bot</button>
            <select>
                <option v-for="" :value="val">{{ name }}</option>
            </select>
        </div>
    </div>
</div>
</template>

<script>
import util from './../utils/util';
import Const from "../consts";

export default {
    name: "BrainEditor",
    props: {

    },
    data() {
        return {
            bot: {},
            activeCell: null,
            brainCellsStash: [],
        };
    },
    methods: {
        setBot(bot) {
            this.bot = bot;

            this.recalculateBrainCells();
        },
        formatCommandName(command) {
            if (util.isset(Const.COMMANDS_NAMES, command)) {
                return Const.COMMANDS_NAMES[command];
            }

            return 'unk';
        },
        convertCommandToInner(command) {
            if (util.isset(Const.COMMANDS_NAMES_TO_NUMBER, command)) {
                return Const.COMMANDS_NAMES_TO_NUMBER[command];
            }

            return null;
        },
        clickOnCell(index, e) {
            if (e.target.tagName === 'INPUT') {
                return;
            }
            if  (this.activeCell === index) {
                this.activeCell = null;
            } else {
                this.activeCell = index;
            }
        },
        onChangeCommand() {
            let changedCommand = this.$refs.activeCommand[0].value;
            let changedParam = parseInt(this.$refs.activeParam[0].value);
            if (isNaN(changedParam)) {
                changedParam = '';
            }
            window.console.log('changed', changedCommand, changedParam);

            let preparedCommand = this.convertCommandToInner(changedCommand);
            if (preparedCommand === null) {
                return;
            }

            window.console.log('update bot', preparedCommand, changedParam);

            this.bot.brain[this.activeCell] = preparedCommand;
            this.bot.params[this.activeCell] = changedParam;

            this.recalculateBrainCells();

            this.$emit('change-bot', this.bot);
        },
        recalculateBrainCells() {
            let arr = [];

            if (util.empty(this.bot) || util.empty(this.bot.brain)) {
                this.brainCells = [];
            }

            for (let i = 0; i < this.bot.brain.length; i++) {
                let item = {};
                item.command = this.bot.brain[i];
                item.param = this.bot.params[i];
                item.active = this.bot.command_cursor === i;
                arr.push(item);
            }

            this.brainCells =  arr;
        },
        copyBotHandler() {
            window.console.log('copy bot', this.bot);
        }
    },
    computed: {
        brainCells: {
            get() {
                return this.brainCellsStash;
            },
            set(newCells) {
                this.brainCellsStash = newCells;
            }
        }
    },
}
</script>

<style scoped>
.brain-editor {
    display: flex;
    flex-direction: column;
    width: 600px;
    background-color: #ccc;
    padding: 5px;
}

.commands-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    width: 600px;
    background-color: #ccc;
    padding: 5px;
    height: 520px;
    border-bottom: 1px solid #333;
}

.commands-list .cell {
    align-self: flex-start;
    width: 60px;
    height: 60px;
    background-color: #af8787;
    margin: 2px;
    padding: 0 2px 2px;
    cursor: pointer;
}

.commands-list .cell.active {
    border: 2px solid red;
}

.cell-index {
    font-size: 9px;
    color: #fff;
}

.cell-input {
    width: 55px;
    height: 17px;
}

.cell-command {
    font-size: 14px;
}
.cell-param {
    color: #29297f;
}

.editor-bottom {
    display: flex;
    flex-direction: row;
}

.editor-bottom .info {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #333;
}

.editor-bottom .additional-buttons {
    padding-top: 10px;
}
</style>