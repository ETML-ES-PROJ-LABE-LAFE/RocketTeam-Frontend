<template>
  <div class="lot-item">
    <p>Numéro de lot: {{ lot.id }}</p>
    <p>Description: {{ lot.description }}</p>
    <p>Catégorie: {{ lot.category.name }}</p>
    <p>Valeur initiale: {{ lot.initialPrice }}</p>
    <p>Offre la plus élevée: {{ lot.highestBid }}</p>
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
  created() {
    console.log('lot:', this.lot);
  },
};
</script>

<style scoped>
.lot-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.lot-item p {
  margin: 5px 0;
}
</style>
