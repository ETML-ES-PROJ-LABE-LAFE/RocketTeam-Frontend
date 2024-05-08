<!-- LotItem.vue -->
<template>
  <div class="lot-item">
    <!-- Display lot details -->
    <p>{{ lot.name }}</p>
    <p>{{ lot.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    lot: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.lot-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
