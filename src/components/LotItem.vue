<!-- LotItem.vue -->
<template>
  <div class="lot-item">
    <p>{{ lot.name }}</p> <!-- Assure-toi que les objets lot ont une propriété 'name' -->
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