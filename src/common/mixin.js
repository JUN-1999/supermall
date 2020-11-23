import { debounce } from "common/util.js";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    };
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      newRefresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  }
};

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    };
  },
  components: {
    BackTop
  },
  methods: {
    // 返回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
};
