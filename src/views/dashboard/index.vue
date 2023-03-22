<template>
  <div class="dashboard-container">
    <div><card></card></div>
    <sale></sale>
    <observer></observer>
  </div>
</template>

<script>
import card from "./card/card.vue";
import sale from "./sale/index.vue";
import observer from "./observer/index.vue";
export default {
  name: "Dashboard",
  components: {
    card,
    sale,
    observer,
  },
};
</script>

<style lang="scss" scoped></style>
