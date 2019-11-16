<template>
    <div>
        <textarea v-bind="$attrs"  @change="handleChange" @input="handleInput">
        </textarea>
    </div>
</template>
<script>
    export default {
        name: 'KTextarea',
        // model: {
        //     prop: 'value',
        //     event: 'change'
        // },
        props: {
            value: {
                type: String,
                default: null,
            }
        },
        methods: {
            handleInput(event) {
                this.$emit('input', event.target.value);
            },
            handleChange(event) {
                console.log(event.target.value)
                this.$emit('change', event.target.value);
            },
        },
    }
</script>

<style lang="scss">

</style>