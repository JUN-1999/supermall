<template>
  <div>
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  box-shadow: 0px -2px 1px rgba(100, 100, 100, 0.3);
}

</style>
