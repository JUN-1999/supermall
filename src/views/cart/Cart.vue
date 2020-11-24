<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!--商品的列表-->
    <cart-list> </cart-list>
    <!--底部汇总-->
    <cart-bottom-bar class="bottombar"></cart-bottom-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters(["cartLength"])
    // cartLengths() {
    // return this.$store.getters.cartLength;
    // }
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: #ff8e96;
  color: #fff;
  font-weight: 900;
}

.bottombar {
  position: absolute;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>
