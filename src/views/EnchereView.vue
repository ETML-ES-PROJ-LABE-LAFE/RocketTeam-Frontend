<template>
  <div class="enchere-background">
    <div class="center-container">
      <h2>Détails du lot</h2>
      <div v-if="loading">Chargement en cours...</div>
      <div v-else>
        <div v-if="lot">
          <LotItem :lot="lot" />
          <ActionButtons :lot="lot" @go-back="goBack" @place-bid="placeBid" @remove-lot="removeLot" />
        </div>
        <div v-else>
          <p>Aucun détail de lot disponible.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import LotsService from '@/Services/LotsServices.js';
import LotItem from '@/components/LotItem.vue';
import ActionButtons from '@/components/ActionButtons.vue';

export default {
  name: 'EnchereView',
  components: {
    LotItem,
    ActionButtons
  },
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

    const placeBid = (bidAmount) => {
      // Logic to place a bid
      console.log("Placing bid:", bidAmount);
      // Implement your logic here
    };

    const goBack = () => {
      // Utilisation de window.history.back() pour revenir à la page précédente
      window.history.back();
    };

    const removeLot = () => {
      // Logic to remove the lot from the auction
      console.log("Removing lot");
      // Implement your logic here
    };

    return {
      lot,
      loading,
      placeBid,
      goBack,
      removeLot
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
  min-height: 100vh;
}

.center-container {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: auto;
  width: 90%;
  max-width: 1100px;
  text-align: center;
}

h2 {
  color: black; /* Changed to black */
  margin-bottom: 20px;
}

.button-container {
  margin-top: 20px;
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
