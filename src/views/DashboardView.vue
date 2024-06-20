<template>
  <div class="dashboard-background">
    <div class="center-container">
      <div v-if="!selectedCustomer">
        <h2>Vous devez être connecté pour accéder à cette page.</h2>
        <router-link to="/">
          <button>Retour à l'accueil</button>
        </router-link>
      </div>
      <div v-else>
        <h1>Tableau de Bord</h1>
        <div class="dashboard-grid">
          <lots-bid :lots="categorizedLots['Lots Enchéris']" />
          <lots-for-sale :lots="categorizedLots['Lots Mis en Vente']" />
          <lots-affected :lots="categorizedLots['Lots Affectés']" @confirm-payment="confirmPayment" />
          <lots-unsold :lots="categorizedLots['Lots Invendus']" />
          <lots-sold :lots="categorizedLots['Lots Vendus']" />
        </div>
      </div>
    </div>
    <div v-if="error" class="error-popup">{{ error }}</div>
    <div v-if="success" class="success-popup">{{ success }}</div>
  </div>
</template>
<script>
import CustomersServices from "@/Services/CustomersServices.js";
import DashboardService from "@/Services/DashboardService.js";
import LotsBid from "@/components/LotsBid.vue";
import LotsForSale from "@/components/LotsForSale.vue";
import LotsAffected from "@/components/LotsAffected.vue";
import LotsUnsold from "@/components/LotsUnsold.vue";
import LotsSold from "@/components/LotsSold.vue";

export default {
  name: 'DashboardView',
  components: {
    LotsBid,
    LotsForSale,
    LotsAffected,
    LotsUnsold,
    LotsSold,
  },
  data() {
    return {
      categorizedLots: {
        "Lots Enchéris": [],
        "Lots Mis en Vente": [],
        "Lots Affectés": [],
        "Lots Invendus": [],
        "Lots Vendus": []
      },
      selectedCustomer: null,
      error: null,
      success: null
    };
  },
  methods: {
    displayMessage(type, message) {
      if (type === 'success') {
        this.success = message;
        this.error = null;
      } else if (type === 'error') {
        this.error = message;
        this.success = null;
      }
      setTimeout(() => {
        this.success = null;
        this.error = null;
      }, 5000);
    },
    async fetchDashboardData() {
      try {
        const customerId = this.selectedCustomer.id;
        this.categorizedLots["Lots Enchéris"] = await DashboardService.getLotsBid(customerId);
        this.categorizedLots["Lots Mis en Vente"] = await DashboardService.getLotsForSale(customerId);
        this.categorizedLots["Lots Affectés"] = await DashboardService.getLotsAffected(customerId);
        this.categorizedLots["Lots Invendus"] = (await DashboardService.getLotsOwned(customerId)).filter(lot => lot.status === 'inactive');
        this.categorizedLots["Lots Vendus"] = await DashboardService.getLotsVendues(customerId);
      } catch (error) {
        this.displayMessage('error', "Erreur lors du chargement des lots.");
      }
    },
    async confirmPayment(encodedId) {
      try {
        await DashboardService.confirmPayment(encodedId, this.selectedCustomer.id);
        this.displayMessage('success', "Paiement confirmé.");
        await this.fetchDashboardData();
      } catch (error) {
        this.displayMessage('error', "Erreur lors de la confirmation du paiement.");
      }
    },
    refreshDashboard() {
      this.fetchDashboardData();
    }
  },
  async mounted() {
    this.selectedCustomer = CustomersServices.getSelectedCustomer();
    if (this.selectedCustomer) {
      await this.fetchDashboardData();
    } else {
      this.displayMessage('error', "Vous devez être connecté pour accéder à cette page.");
    }
  }
};
</script>
<style scoped>
.dashboard-background {
  width: 100%;
  padding: 20px 0;
  background: #a0c4ff;
  background: linear-gradient(to bottom right, #3498db, #bdc3c7);
  min-height: 100vh;
}

.center-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: auto;
  width: 90%;
  max-width: 1200px;
}

h1 {
  color: #333;
  text-align: center;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.dashboard-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dashboard-column h2 {
  text-align: center;
}

.error-popup,
.success-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 30px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1050;
  max-width: 90%;
  text-align: center;
}

.error-popup {
  background-color: #fff;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.success-popup {
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #d6e9c6;
}

.router-link button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  transition: background-color 0.3s;
}

.router-link button:hover {
  background-color: #2980b9;
}
</style>