<template>
  <div class="lot">
    <p><strong>Numéro de lot:</strong> {{ lot.number }}</p>
    <p><strong>Description:</strong> {{ lot.description }}</p>
    <p><strong>Catégorie:</strong> {{ lot.category }}</p>
    <p><strong>Valeur initiale:</strong> {{ lot.initialValue }}</p>
    <p><strong>Plus haute enchère:</strong> {{ lot.highestBid }}</p>
  </div>
</template>

<script>
export default {
  props: ['lot']
};
</script>

<style scoped>
/* Styles spécifiques pour LotItem */
.lot {
  border: 2px solid #007bff;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.lot:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
