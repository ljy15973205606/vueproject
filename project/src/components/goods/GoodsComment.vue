<template>
    <div>
        <comment :newsid="id"></comment>
    </div>
</template>
<script>
import comment from '../sub-components/Comment.vue';
export default {
    data() {
        return {
            
        }
    },
    components:{
        comment
    },
    props:['id']
}
</script>
<style lang="less" scoped>

</style>