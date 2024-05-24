<template>
  <div class="lot-item">
    <div class="lot-attribute">
      <strong class="attribute-name">Numéro de lot:</strong>
      <span class="attribute-value">{{ lot.id }}</span>
    </div>
    <div class="lot-attribute">
      <strong class="attribute-name">Description:</strong>
      <span class="attribute-value">{{ lot.description }}</span>
    </div>
    <div class="lot-attribute">
      <strong class="attribute-name">Catégorie:</strong>
      <span class="attribute-value">{{ lot.category.name }}</span>
    </div>
    <div class="lot-attribute">
      <strong class="attribute-name">Valeur initiale:</strong>
      <span class="attribute-value">{{ lot.initialPrice }}</span>
    </div>
    <div class="lot-attribute">
      <strong class="attribute-name">Offre la plus élevée:</strong>
      <span class="attribute-value">{{ lot.highestBid }}</span>
    </div>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  color: white;
  width: 100%; /* Full width in the parent container */
  max-width: 800px;
  margin: 15px auto;
}

.lot-attribute {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.attribute-name {
  margin-right: 10px;
  font-weight: bold;
}

.attribute-value {
  text-align: right;
  margin-left: auto;
}
</style>
