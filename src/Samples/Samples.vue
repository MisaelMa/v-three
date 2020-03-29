<template>
    <div>
        <example1/>
    </div>
</template>

<script lang="ts">
    import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';
    import example1 from '@/Samples/example1.vue';

    @Component({
        components: {
            example1
        }
    })
    export default class Samples extends Vue {


    }
</script>

<style scoped>

</style>
