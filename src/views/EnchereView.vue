<template>
  <div class="enchere-background">
    <div class="center-container">
      <h2>Détails du lot</h2>
      <div v-if="loading">Chargement en cours...</div>
      <div v-else>
        <div v-if="lot">

          <ActionButtons
              :lot="lot"
              :selectedCustomer="selectedCustomer"
              @go-back="goBack"
              @place-bid="showBidModal"
              @remove-lot="removeLot"
          />
          <div v-if="showModal" class="modal">
            <div class="modal-content">
              <span class="close" @click="hideBidModal">&times;</span>
              <h2>Placer une enchère</h2>
              <input v-model="bidAmount" type="number" placeholder="Entrez votre offre" />
              <button @click="placeBid">Soumettre</button>
            </div>
          </div>
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
/*import LotItem from '@/components/LotItem.vue';*/
import ActionButtons from '@/components/ActionButtons.vue';
import EnchereService from '@/Services/EnchereService.js';
import CustomersServices from '@/Services/CustomersServices.js';

export default {
  name: 'EnchereView',
  components: {
    /*LotItem,*/
    ActionButtons
  },
  props: ['encodedId'],
  setup(props) {
    const lot = ref(null);
    const loading = ref(true);
    const showModal = ref(false);
    const bidAmount = ref(0);
    const selectedCustomer = ref(CustomersServices.getSelectedCustomer());

    const decodeId = (encodedId) => {
      return atob(encodedId);
    };

    onMounted(async () => {
      try {
        const lotId = decodeId(props.encodedId);
        lot.value = await LotsService.getLotById(lotId);
      } catch (error) {
          this.displayError('LotError', "Erreur lors du chargement des lots, veuillez essayer plus tard");
        }
         finally {
        loading.value = false;
      }
    });

    const placeBid = async () => {
      if (!selectedCustomer.value) {
        alert("Vous devez être connecté pour placer une enchère.");
        return;
      }
      if (parseFloat(bidAmount.value) > lot.value.highestBid) {
        try {
          const enchere = {
            amount: parseFloat(bidAmount.value),
            timestamp: new Date().toISOString(),
            lot: { id: lot.value.id },
            customer: { id: selectedCustomer.value.id }
          };
          await EnchereService.placeEnchere(enchere);
          lot.value.highestBid = parseFloat(bidAmount.value);
          hideBidModal();
        } catch (error) {
          console.error("Error placing bid:", error);
        }
      } else {
        alert("Votre offre doit être supérieure à l'offre la plus élevée.");
      }
    };

    const showBidModal = () => {
      showModal.value = true;
    };

    const hideBidModal = () => {
      showModal.value = false;
    };

    const goBack = () => {
      window.history.back();
    };

    const removeLot = () => {
      console.log("Removing lot");
    };

    return {
      lot,
      loading,
      showModal,
      bidAmount,
      selectedCustomer,
      placeBid,
      showBidModal,
      hideBidModal,
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
  color: black;
  margin-bottom: 20px;
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

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
