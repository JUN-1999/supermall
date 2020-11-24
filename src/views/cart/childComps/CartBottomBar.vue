<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      ></check-button>
      <span> 全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div @click="calcClick" class="calculate">去计算：{{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        // 全部选中
        this.cartList.forEach(item => (item.checked = false));
      } else {
        // 有部分或者全部不选中
        this.cartList.forEach(item => (item.checked = true));
      }

      // this.cartList.forEach(item => (item.checked = !this.isSelectAll));
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择商品', 2000);
      }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      //return !(this.cartList.filter(item => !item.checked).length);
      return !this.cartList.find(item => !item.checked);
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: pink;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 5px;
  flex: 1;
}

.calculate {
  width: 90px;
  background-color: orange;
  text-align: center;
  color: aliceblue;
}
</style>
