<template>
  <nav>
    <div class="nav-container">
      <div class="nav-links">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/lots">Lots</router-link> |
        <router-link v-if="selectedCustomer" to="/manage-lots">Gestion des Lots</router-link> |
        <router-link v-if="selectedCustomer" to="/dashboard">Tableau de Bord</router-link>
      </div>
      <div class="logo-container">
        <img src="@/assets/auction_logo.png" alt="Logo" class="logo">
      </div>
      <div class="customer-section">
        <div class="customer-info">
          <button @click="addFunds">Ajouter des fonds</button>
          <select v-model="selectedCustomerId" @change="customerChanged" class="customer-select">
            <option value="">Non connecté</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">{{ customer.name }}</option>
          </select>
          <NotificationBell :userId="selectedCustomerId" />
          <div v-if="selectedCustomer" class="balance-info">
            <span>Solde: {{ selectedCustomer.balance - selectedCustomer.reservedBalance }}</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
import CustomersServices from '@/Services/CustomersServices.js';
import NotificationBell from '@/components/NotificationBell.vue';

export default {
  components: {
    NotificationBell
  },
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
      this.$router.go();
    },
    async addFunds() {
      const amount = parseFloat(prompt("Entrez le montant à ajouter:"));
      if (!isNaN(amount) && amount > 0) {
        this.selectedCustomer.balance += amount;
        await CustomersServices.updateCustomerBalance(this.selectedCustomer);
        this.$router.go();
      } else {
        alert("Veuillez entrer un montant valide.");
      }
    }
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  background: linear-gradient(to bottom right, #3498db, #bdc3c7);
  color: white;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #000;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  position: relative;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-links {
  display: flex;
  align-items: center;
}

.logo-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.logo-container img {
  height: 50px;
  width: auto;
}

.customer-section {
  display: flex;
  align-items: center;
}

.customer-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

nav a {
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  margin-right: 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

nav a:hover {
  background-color: #3498db;
  color: #fff;
}

.customer-select {
  padding: 8px 12px;
  border-radius: 5px;
  width: 250px;
  margin-left: 10px;
  border: 1px solid #ccc;
  background-color: white;
  color: black;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.customer-select:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.balance-info {
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: #fff;
}

.balance-info span {
  margin-right: 10px;
}

button {
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
}

button:hover {
  background-color: #2980b9;
}
</style>
