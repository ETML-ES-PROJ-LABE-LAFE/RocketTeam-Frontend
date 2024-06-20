<template>
  <div>
    <h2>Lots Affectés</h2>
    <div class="lot-container">
      <div class="lot-card" v-for="lot in lots" :key="lot.id">
        <h3>{{ lot.title }}</h3>
        <p>{{ lot.description }}</p>
        <p><strong>État:</strong> {{ lot.status }}</p>
        <p><strong>Montant de l'enchère:</strong> {{ lot.highestBid }} €</p>
        <button @click="showPaymentModal(lot)">Payer</button>
      </div>
    </div>
    <div v-if="selectedLot" class="modal">
      <div class="modal-content">
        <h3>Confirmer le paiement pour {{ selectedLot.title }}</h3>
        <p>Montant: {{ selectedLot.highestBid }} €</p>
        <button @click="confirmPayment">Confirmer le paiement</button>
        <button @click="closePaymentModal">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LotsAffected',
  props: ['lots'],
  data() {
    return {
      selectedLot: null,
    };
  },
  methods: {
    showPaymentModal(lot) {
      this.selectedLot = lot;
    },
    closePaymentModal() {
      this.selectedLot = null;
    },
    async confirmPayment() {
      try {
        const encodedId = btoa(this.selectedLot.id);
        await this.$emit('confirm-payment', encodedId);
        this.selectedLot = null;
      } catch (error) {
        this.$emit('payment-error', error);
      }
    }
  }
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

.lot-card button {
  background: #3498db;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.lot-card button:hover {
  background: #2980b9;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content button {
  margin: 10px;
}
</style>
