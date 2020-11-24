<template>
  <div id="detail">
    <detail-nav-bar
      @titleClick="titleClick"
      class="detail-nav"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="param"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :commentInfo="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :isShow="isShow"></toast>-->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import { debounce } from "common/util.js";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail.js";
import { itemListenerMixin, backTopMixin } from "common/mixin.js";

// import Toast from "components/common/toast/Toast";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailBottomBar,

    DetailCommentInfo,
    Scroll,
    GoodsList
    // Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTops: [],
      getThemeTopy: null,
      currentIndex: 0,
      isShowBackTop: 0
      // message: "",
      // isShow: false
    };
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();

      this.getThemeTopy();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTops[index] + 44, 200);
    },

    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 1.获取y值
      const positionY = -position.y;
      // 2.positionY和主题中的值对比
      let length = this.themeTops.length;
      for (let i = 0; i < length - 1; i++) {
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTops[i] &&
        //     positionY < this.themeTops[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTops[i]))
        // ) {
        //   // console.log(this.currentIndex);
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }

        if (
          this.currentIndex !== i &&
          positionY >= this.themeTops[i] &&
          positionY < this.themeTops[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      // 获取我们购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将我们的商品加入购物车（1.Promise 2.mapActions）
      // this.$store.cartList.push()
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product).then(res => {
        // this.isShow = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.isShow = false;
        //   this.message = "";
        // }, 1500);

        this.$toast.show(res, 2000);
      });
    }
  },
  created() {
    // 1.保存传入的id
    this.iid = this.$route.params.iid;
    // 2.根据id请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取数据 console.log(res);
      const data = res.result;
      // 2.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      // 3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 4.创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 6.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 获取每个模块的位置 offTop
      // 根据最新的数据，对应的Dom是已经被渲染出来的
      // 但是图片没有算在内
      // this.$nextTick(() => {
      //   this.themeTops = [];
      //   this.themeTops.push(0);
      //   this.themeTops.push(this.$refs.param.$el.offsetTop);
      //   this.themeTops.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      // });
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });

    // 4.给getThemeTopy赋值
    this.getThemeTopy = debounce(() => {
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
    });
  },
  mounted() {},
  updated() {
    // this.themeTops = [];
    // this.themeTops.push(0);
    // this.themeTops.push(this.$refs.param.$el.offsetTop);
    // this.themeTops.push(this.$refs.comment.$el.offsetTop);
    // this.themeTops.push(this.$refs.recommend.$el.offsetTop);
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>
