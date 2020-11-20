<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="changeIndex(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}

.active {
  color: pink;
}
.active span {
  border-bottom: 3px solid pink;
}
</style>
