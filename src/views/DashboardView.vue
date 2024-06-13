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
        <div class="lot-container">
          <div class="lot-card" v-for="lot in lots" :key="lot.id">
            <h2>{{ lot.title }}</h2>
            <p>{{ lot.description }}</p>
            <p><strong>État:</strong> {{ lot.status }}</p>
            <button @click="handleAction(lot)">Action</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error" class="error-popup">{{ error }}</div>
    <div v-if="success" class="success-popup">{{ success }}</div>
  </div>
</template>

<script>
import CustomersServices from "@/Services/CustomersServices.js";

export default {
  name: 'DashboardView',
  data() {
    return {
      lots: [], // Ceci sera peuplé avec les données des lots plus tard
      selectedCustomer: null,
      error: null,
      success: null
    };
  },
  methods: {
    handleAction(lot) {
      // Logique pour gérer les actions basées sur l'état du lot
      alert(`Action pour le lot: ${lot.title}`);
    },
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
    }
  },
  mounted() {
    this.selectedCustomer = CustomersServices.getSelectedCustomer();
    if (this.selectedCustomer) {
      // Simulation de données, tu remplaceras ceci par une requête API pour obtenir les données réelles
      this.lots = [
        { id: 1, title: 'Lot 1', description: 'Description du Lot 1', status: 'En cours d’enchère' },
        { id: 2, title: 'Lot 2', description: 'Description du Lot 2', status: 'Proposé aux enchères' },
        { id: 3, title: 'Lot 3', description: 'Description du Lot 3', status: 'Affecté comme preneur' },
        { id: 4, title: 'Lot 4', description: 'Description du Lot 4', status: 'Invendu' }
      ];
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
  background: linear-gradient(to bottom right, #3498db, #bdc3c7);
  color: white;
  min-height: 100vh;
}

.center-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: auto;
  width: 90%;
  max-width: 1100px;
}

h1, h2 {
  color: black;
  text-align: center;
}

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
  flex: 1 1 calc(33.333% - 40px); /* Trois cartes par ligne, avec espace entre elles */
  box-sizing: border-box;
}

.lot-card h2 {
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
