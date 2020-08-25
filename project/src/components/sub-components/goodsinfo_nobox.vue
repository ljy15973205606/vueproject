<template>
    <div>
       <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" value="1" ref="nobox"  @change="countChanged"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
    </div>
</template>
<script>
import mui from '../../../lib/mui/js/mui';
export default {
    data() {
        return {
            
        }
    },
    methods: {
        countChanged(){
            const val = this.$refs.nobox.value;
            this.$emit('func',val);
        }
    },
    mounted() {
        mui('.mui-numbox').numbox()
    },
    props:['max'],
    watch: {
        max:function(newval,oldval){
            mui('.mui-numbox').numbox().setOption('max',newval);
        }
    },
}
</script>
<style lang="less" scoped>

</style>