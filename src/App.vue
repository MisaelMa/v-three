<template>
    <div id="app">
      <Samples/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Samples from '@/Samples/Samples.vue';

    @Component({
        components: {
            Samples
        }
    })
    export default class App extends Vue {
    }
</script>
