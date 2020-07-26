<template>
    <div>
        <h3>增加数值:{{count}}</h3>
        <input type="button" value="+1" @click="add">
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
    data() {
        return {
           
        }
    },
    methods: {
       /*  increment(){
            this.$store.commit('add');
        } */
        ...mapMutations(['add'])
    },
    computed: {
        ...mapState(['count'])
    },
}
</script>

<style>
    
</style>