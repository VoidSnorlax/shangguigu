<template>
  <div class="dashboard-container">
    <div><card></card></div>
    <sale></sale>
  </div>
</template>

<script>
import card from "./card/card.vue";
import sale from './sale/index.vue'
export default {
  name: "Dashboard",
  components: {
    card,
    sale
  },
};
</script>

<style lang="scss" scoped></style>
