<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
  
    <div class="info-header">
      <div class="header-title">用户评论</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="" />
      <span>{{ commentInfo.user.uname }}</span>
    </div>

    <div class="info-detail">
      <p>{{ commentInfo.content }}</p>
      <div class="info-other">
        <span class="date">{{ commentInfo.created }}</span>
        <span>{{ commentInfo.style }}</span>
      </div>
      <div class="info-imgs">
        <img
          :src="item"
          alt=""
          v-for="(item, index) in commentInfo.images"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    // showData: function(value) {
    //   let date = new Date(value * 1000);
    //   return formtDate(date, "yyyy-MM-dd");
    // }
  }
};
</script>

<style scoped>
.info-header{
    height: 40px;
    background-color: red;
}
</style>
