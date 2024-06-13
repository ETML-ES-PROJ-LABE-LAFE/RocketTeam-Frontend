<template>
  <div class="enchere-background">
    <div class="center-container">
      <h2>Détails du lot</h2>
      <div v-if="loading">Chargement en cours...</div>
      <div v-else>
        <div v-if="lot">
          <LotItem :lot="lot" :showImage="true" />
          <ActionButtons
              :lot="lot"
              :selectedCustomer="selectedCustomer"
              @go-back="goBack"
              @place-bid="showBidModal"
          />
          <div v-if="showModal" class="modal">
            <div class="modal-content">
              <span class="close" @click="hideBidModal">&times;</span>
              <h2>Placer une enchère</h2>
              <input
                  v-model="bidAmount"
                  type="number"
                  :min="lot.highestBid + 1"
                  :max="selectedCustomer ? selectedCustomer.balance : null"
                  placeholder="Entrez votre offre"
              />
              <button @click="placeBid">Soumettre</button>
              <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            </div>
          </div>
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
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
import {ref, onMounted} from 'vue';
import LotsService from '@/Services/LotsServices.js';
import LotItem from '@/components/LotItem.vue';
import ActionButtons from '@/components/ActionButtons.vue';
import EnchereService from '@/Services/EnchereService.js';
import CustomersServices from '@/Services/CustomersServices.js';

export default {
  name: 'EnchereView',
  components: {
    LotItem,
    ActionButtons
  },
  props: ['encodedId'],
  setup(props) {
    const lot = ref(null);
    const loading = ref(true);
    const showModal = ref(false);
    const bidAmount = ref(0);
    const errorMessage = ref('');
    const successMessage = ref('');
    const selectedCustomer = ref(CustomersServices.getSelectedCustomer());

    const decodeId = (encodedId) => {
      return atob(encodedId);
    };

    const updateCustomerBalance = async () => {
      if (selectedCustomer.value) {
        try {
          const totalBidAmount = await EnchereService.getTotalBidAmountByCustomer(selectedCustomer.value.id);
          selectedCustomer.value.balance = selectedCustomer.value.originalBalance - totalBidAmount;
          CustomersServices.setSelectedCustomer(selectedCustomer.value);
        } catch (error) {
          console.error('Failed to update customer balance:', error);
        }
      }
    };

    onMounted(async () => {
      try {
        const lotId = decodeId(props.encodedId);
        lot.value = await LotsService.getLotById(lotId);
        await updateCustomerBalance();
      } catch (error) {
        console.error("Erreur lors du chargement des lots, veuillez essayer plus tard", error);
      } finally {
        loading.value = false;
      }
    });

    const placeBid = async () => {
      errorMessage.value = '';
      successMessage.value = '';
      if (!selectedCustomer.value) {
        errorMessage.value = "Vous devez être connecté pour placer une enchère.";
        return;
      }

      try {
        const totalBidAmountResponse = await EnchereService.getTotalBidAmountByCustomer(selectedCustomer.value.id);
        const totalBidAmount = Number(totalBidAmountResponse);

        const availableBalance = Number(selectedCustomer.value.balance) - totalBidAmount;
        console.log("Available Balance:", availableBalance);
        console.log("Bid Amount before submitting:", bidAmount.value);

        if (parseFloat(bidAmount.value) > lot.value.highestBid && parseFloat(bidAmount.value) <= availableBalance) {
          const enchere = {
            amount: Number(bidAmount.value),
            timestamp: new Date().toISOString(),
            lot: {id: lot.value.id},
            customer: {id: selectedCustomer.value.id}
          };
          console.log("Enchere object before submitting:", enchere);
          await EnchereService.placeEnchere(enchere);
          lot.value.highestBid = parseFloat(bidAmount.value);
          successMessage.value = "Votre enchère a été placée avec succès.";
          await updateCustomerBalance();
          hideBidModal();
        } else {
          if (parseFloat(bidAmount.value) <= lot.value.highestBid) {
            errorMessage.value = "Votre offre doit être supérieure à l'offre la plus élevée.";
          } else {
            errorMessage.value = "Votre offre dépasse votre solde disponible.";
          }
        }
      } catch (error) {
        console.error("Error placing bid:", error);
        errorMessage.value = error.response?.data?.message || "Erreur lors de la soumission de l'enchère.";
      }
    };

    const showBidModal = () => {
      bidAmount.value = lot.value.highestBid + 1;
      showModal.value = true;
    };

    const hideBidModal = () => {
      showModal.value = false;
    };

    const goBack = () => {
      window.history.back();
    };

    return {
      lot,
      loading,
      showModal,
      bidAmount,
      errorMessage,
      successMessage,
      selectedCustomer,
      placeBid,
      showBidModal,
      hideBidModal,
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

.error {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 20px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
}
</style>
