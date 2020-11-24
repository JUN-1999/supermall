import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
// 1.安装插件
Vue.use(Vuex);

const state = {
  cartList: []
};

// 2.创建Store对象
const store = new Vuex.Store({
  state,
  mutations,
  //  mutations 唯一的目的，修改state状态
  // mutations中的每个方法尽可能完成的事件比较单一
  //   查找之前数组中是否有该数组
  //   let oldProduct = null;
  //   for (let item of state.cartList) {
  //     if (item.iid === payload.iid) {
  //       oldProduct = item;
  //     }
  //   }
  //
  //
  //
  actions,
  getters
});

// 3.挂载Vue实例上
export default store;
