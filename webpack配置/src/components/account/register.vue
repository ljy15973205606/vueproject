<template>
    <div>
        <h3>减少数值:{{count}}</h3>
        <input type="button" value="-1" @click="sub">
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
  data() {
      return {}
  },
  methods: {
      ...mapMutations(['sub']),
  },
  computed: {
          ...mapState(['count'])
      },
}
</script>

<style>
    
</style>