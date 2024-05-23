<template>
  <div class="enchere-background">
    <div class="center-container">
      <h2>Détails du lot</h2>
      <div v-if="loading">Chargement en cours...</div>
      <div v-else>
        <div v-if="lot">
          <div class="lot-details">
            <p><strong>Description:</strong> {{ lot.description }}</p>
            <p><strong>Catégorie:</strong> {{ lot.category.name }}</p>
            <p><strong>Valeur initiale:</strong> {{ lot.initialPrice }}</p>
            <p><strong>Offre la plus élevée:</strong> {{ lot.highestBid }}</p>
          </div>
          <button @click="placeBid">Enchérir</button>
          <button @click="goBack">Retour à la liste</button>
        </div>
        <div v-else>
          <p>Aucun détail de lot disponible.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import LotsService from '@/Services/LotsServices.js';

export default {
  name: 'EnchereView',
  props: ['id'],
  setup(props) {
    const lot = ref(null);
    const loading = ref(true);

    onMounted(async () => {
      try {
        lot.value = await LotsService.getLotById(props.id);
      } catch (error) {
        console.error("Error fetching lot details:", error);
      } finally {
        loading.value = false;
      }
    });

    const placeBid = () => {
      // Logic to place a bid
    };

    const goBack = () => {
      this.$router.push({ name: 'lots' });
    };

    return {
      lot,
      loading,
      placeBid,
      goBack
    };
  }
};
</script>

<style>
.enchere-background {
  width: 100%;
  padding: 20px 0;
  background: linear-gradient(to bottom right, #3498db, #bdc3c7);
  color: white;
}

.center-container {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin: auto;
  width: 90%;
  max-width: 1100px;
  text-align: center;
}

.lot-details {
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

p {
  margin: 10px 0;
}

button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}
</style>
