<template>
  <div>
    <h2>Lots Enchéris</h2>
    <div class="lot-container">
      <div class="lot-card" v-for="lot in lots" :key="lot.id">
        <h3>{{ lot.title }}</h3>
        <p>{{ lot.description }}</p>
        <p><strong>État:</strong> {{ lot.status }}</p>
        <p><strong>Montant de l'enchère:</strong> {{ lot.highestBid }} €</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LotsBid',
  props: ['lots'],

};
</script>

<style scoped>
.lot-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.lot-card {
  background: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(33.333% - 40px);
  box-sizing: border-box;
}

.lot-card h3 {
  margin-top: 0;
  color: #2c3e50;
}

.lot-card p {
  color: #34495e;
}


</style>
