<template>
  <div class="dashboard-container">
    <div><card></card></div>
  </div>
</template>

<script>
import card from "./card/card.vue";

export default {
  name: "Dashboard",
  components: {
    card,
  },
};
</script>

<style lang="scss" scoped></style>
