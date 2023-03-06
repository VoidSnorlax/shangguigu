<template>
  <a :title="title" style="margin: 10px;">
    <el-button v-bind="$attrs" v-on:event="$listeners"></el-button>
  </a>
</template>

<script>
export default {
  name: "Hitbutton",
  props: ["title"],
};
</script>

<style scoped></style>
