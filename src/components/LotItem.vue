<template>
  <div class="lot">
    <p><strong>Numéro de lot:</strong> {{ lot.number }}</p>
    <p><strong>Description:</strong> {{ lot.description }}</p>
    <p><strong>Catégorie:</strong> {{ lot.category }}</p>
    <p><strong>Sous-catégorie:</strong> {{ lot.sscategory }}</p>
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
.lot {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.lot:hover {
  transform: translateY(-5px);
}
</style>
