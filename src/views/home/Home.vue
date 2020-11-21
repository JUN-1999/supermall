<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUP="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature></feature>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import Feature from "./childComps/Feature";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/util.js";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    Feature,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 防抖动函数的返回值
    const refresh = debounce(this.$refs.scroll.refresh, 500);

    // 3.简听item图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      refresh();
      // this.$refs.scroll && this.$refs.scroll.refresh();
    });
  },
  methods: {
    // ///////////
    // 事件监听相关的方法
    // ///////////

    // // 防抖函数
    // debounce(func, delay) {
    //   let timer = null;

    //   return function(...args) {
    //     if (timer) clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    // 返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //判断返回底部图标是否显示
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
    },
    // 加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);

      this.$refs.scroll.scroll.refresh();
    },
    // ////////////
    //  网络请求相关
    // ///////////
    //   1.请求多个数据

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 商品列表
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: #ff8e96;
  color: aliceblue;
  font-weight: 900;

  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 99;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
