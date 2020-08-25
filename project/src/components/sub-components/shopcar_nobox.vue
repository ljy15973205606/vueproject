<template>
    <div>
       <div class="mui-numbox" data-numbox-min='1' style="height:25px">
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" :value="initCount" ref="nobox"  @change="countChanged"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
    </div>
</template>
<script>
import mui from '../../../lib/mui/js/mui';
import {mapMutations} from 'vuex';
export default {
    data() {
        return {
            
        }
    },
    methods: {
        countChanged(){
            const val = this.$refs.nobox.value;
           this.updateGoodsCount({id:this.id,count:val});
        },
     ...mapMutations(['updateGoodsCount']),
    },
    mounted() {
        mui('.mui-numbox').numbox()
    },
    props:['initCount','id']
}
</script>
<style lang="less" scoped>

</style>