<template>
<div class="editor-toolbar">
    <button
        :class="{btn:true, selected: selectedTool === 'add'}"
        @click="$emit('select-tool', 'add')"
    >Add</button>
    <button
        :class="{btn:true, selected: selectedTool === 'delete'}"
        @click="$emit('select-tool', 'delete')"
    >Delete</button>
    <button
        :class="{btn:true, selected: selectedTool === 'edit'}"
        @click="$emit('select-tool', 'edit')"
    >Edit</button>
    |
    <button
        :class="{btn:true, active: isPlay}"
        @click="$emit('play')">Play</button>
    <button
        :class="{btn:true, active: !isPlay}"
        @click="$emit('pause')">Pause</button>
    <button class="btn" @click="$emit('next-frame')">Next</button>
</div>
</template>

<script>
export default {
    name: "EditorToolbar",
    props: {
        selectedTool: String,
        isPlay: Boolean,
    }
}
</script>

<style scoped>
.editor-toolbar {
    padding: 5px;
}
.selected {
    background: #71a366;
}

.btn.active {
    background-color: #71b1b1;
}
</style>