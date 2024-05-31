<template>
  <nav>
    <div class="nav-container">
      <div class="nav-links">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/lots">Lots</router-link> |
        <router-link v-if="selectedCustomer" to="/manage-lots">Gestion des Lots</router-link> |
      </div>
      <div class="customer-select-container">
        <select v-model="selectedCustomerId" @change="customerChanged" class="customer-select">
          <option value="">Non connecté</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
        </select>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
import CustomersServices from '@/Services/CustomersServices.js';

export default {
  data() {
    return {
      customers: [],
      selectedCustomer: null,
      selectedCustomerId: null
    };
  },
  async created() {
    try {
      this.customers = await CustomersServices.getAllCustomers();
      const selectedCustomer = CustomersServices.getSelectedCustomer();
      if (selectedCustomer) {
        this.selectedCustomer = selectedCustomer;
        this.selectedCustomerId = selectedCustomer.id;
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  },
  watch: {
    selectedCustomerId(newId) {
      if (newId) {
        this.selectedCustomer = this.customers.find(customer => customer.id === Number(newId));
        CustomersServices.setSelectedCustomer(this.selectedCustomer);
      } else {
        this.selectedCustomer = null;
        CustomersServices.setSelectedCustomer(null);
      }
    }
  },
  methods: {
    customerChanged() {
      this.$router.go(); // Reload the page by programmatically refreshing the router
    }
  }
};
</script>

<style>
/* Réinitialisation pour le body et html pour enlever les marges par défaut */
html, body {
  margin: 0;
  padding: 0;
  height: 100%; /* S'assure que le html et body prennent toute la hauteur */
  width: 100%; /* S'assure que le html et body prennent toute la largeur */
  overflow-x: hidden; /* Prévient le débordement horizontal */
  background: linear-gradient(to bottom right, #3498db, #bdc3c7); /* Ajout du fond global */
  color: white; /* Texte en blanc par défaut */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

nav {
  display: flex; /* Utilise flexbox pour une disposition flexible */
  justify-content: space-between; /* Espacement entre les éléments */
  align-items: center; /* Centrage vertical des éléments */
  padding: 10px 20px; /* Espacement autour de la barre de navigation */
  background-color: #000; /* Fond noir pour la bannière */
  width: 100%; /* Assure que la nav occupe toute la largeur */
  margin: 0; /* Supprime toute marge par défaut */
}

.nav-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.nav-links {
  display: flex;
  align-items: center;
}

nav a {
  color: #fff; /* Texte blanc pour un contraste optimal avec le fond noir */
  font-weight: bold; /* Texte en gras */
  padding: 10px 20px; /* Padding autour du texte pour créer un effet de bouton */
  margin-right: 20px; /* Margin Right pour laisser un espace sur la droite */
  border-radius: 5px; /* Bords légèrement arrondis */
  text-decoration: none; /* Supprime le soulignement des liens */
  transition: background-color 0.3s, color 0.3s; /* Animation douce pour le survol */
}

nav a:hover {
  background-color: #3498db; /* Bleu clair pour le survol */
  color: #fff; /* Texte reste blanc lors du survol */
}

.customer-select-container {
  display: flex;
  align-items: center;
}

.customer-select {
  padding: 8px 12px;
  border-radius: 5px;
  width: 250px; /* Largeur augmentée pour meilleure lisibilité */
  margin-left: 10px; /* Ajuste l'espace pour qu'il ne soit pas coupé */
  border: 1px solid #ccc;
  background-color: white;
  color: black;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s; /* Animation douce pour focus */
}

.customer-select:focus {
  border-color: #3498db; /* Couleur de la bordure au focus */
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5); /* Ombre portée au focus */
}
</style>
