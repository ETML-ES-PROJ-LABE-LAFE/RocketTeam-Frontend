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
  align-items: flex-end;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  width: 30%;
  min-width: 250px;
  max-width: 400px;
  margin: 15px auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.lot-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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
}
</style>
