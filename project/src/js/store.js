
//创建store状态管理
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
let car = JSON.parse(localStorage.getItem('cart')||'[]');
const store = new Vuex.Store({
    state:{
        cart:car
    },
    mutations:{
        addToShopCart(state,goods){
            let flag = false;
          state.cart.some(item =>{
              if(item.id == goods.id){
                 item.count += parseInt( goods.count);
                 item.count = parseInt(item.count);
                  flag = true;
                  return true;
              }
             
          })
          if(!flag){
              state.cart.push(goods);
          }
          localStorage.setItem('cart',JSON.stringify(state.cart));
          
        },
        updateGoodsCount(state,goods){
                 state.cart.some(item=>{
                     if(item.id == goods.id){
                         item.count = parseInt(goods.count);
                         return true;
                     }
                 });
         localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        delFromCart(state,id){
            state.cart.some((item,i)=>{
                if(item.id == id){
                    state.cart.splice(i,1);
                    return true;
                }
            });
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        changeSelectedState(state,obj){
            state.cart.some(item=>{
                if(item.id == obj.id){
                    item.selected = obj.selected;
                    return true;
                }
            });
            localStorage.setItem('cart',JSON.stringify(state.cart));
        }
    
    },
    getters:{
        totalCount:function(state){
             let c = 0;
             state.cart.forEach(item => c += parseInt(item.count))
             return c;
        },
        idStr:function(state){
           arr = [];
           state.cart.forEach(item =>{
               arr.push(item.id);
           })
           return arr.join(',');
        },
        getGoodsCount(state){
          let o ={};
          state.cart.forEach(item =>{
              o[item.id] = item.count;
          })
          return o;
        },
        getIdSelectedObj(state){
            let o={};
            state.cart.forEach(item=>{
                o[item.id] = item.selected;
            })
            return o; 
        },
        getSelectedCount(state){
            let c=0;
            state.cart.forEach(item=>{
                if(item.selected){
                     c += parseInt(item.count);
                }
            });
            return c;
        },
        getSelectedPrice(state){
            let c=0;
            state.cart.forEach(item=>{
               if(item.selected){
                   c += parseInt(item.count * item.price);
               }
            });
            return c;
        }
    }
});

export default store;
