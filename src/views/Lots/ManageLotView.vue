<template>
  <div class="manage-lots-background">
    <div class="center-container">
      <div v-if="!selectedCustomer">
        <h2>Vous devez être connecté pour accéder à cette page.</h2>
        <router-link to="/">
          <button>Retour à l'accueil</button>
        </router-link>
      </div>
      <div v-else>
        <h2>Gestion des Lots</h2>
        <div class="button-group">
          <button @click="mode = 'add'">Ajouter un Lot</button>
          <button @click="mode = 'remove'">Gérer les Lots</button>
        </div>
        <div v-if="mode === 'remove'" class="filter-group">
          <label for="lotStatus" style="color:black">Afficher les lots:</label>
          <select id="lotStatus" v-model="filterStatus" @change="filterLots">
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
            <option value="pending">En attente de paiement</option> <!-- Nouvelle option -->
          </select>
        </div>
        <LotManagement
            v-if="mode === 'add'"
            :mainCategories="mainCategories"
            :subcategories="subcategories"
            :selectedMainCategory="selectedMainCategory"
            :localLot="localLot"
            :mode="mode"
            :selectedCustomer="selectedCustomer"
            @fetchSubcategories="fetchSubcategories"
            @handleSubmit="handleSubmit"
            @updateLocalLot="updateLocalLot"
            @update:selectedMainCategory="selectedMainCategory = $event"
        />
        <LotsList
            v-if="mode === 'remove'"
            :lots="filteredLots"
            :showDeleteButton="filterStatus === 'inactive'"
            :showEndAuctionButton="filterStatus === 'active'"
            @delete-lot="confirmDeleteLot"
            @end-auction="confirmEndAuction"
        />
      </div>
    </div>
    <div v-if="error" class="error-popup">{{ error }}</div>
    <div v-if="success" class="success-popup">{{ success }}</div>
  </div>
</template>

<script>
import LotsList from "@/components/LotsList.vue";
import LotManagement from "@/components/LotManagement.vue";
import LotsService from "@/Services/LotsServices.js";
import CategoryService from "@/Services/CategoryServices.js";
import CustomersServices from "@/Services/CustomersServices.js";

export default {
  components: {
    LotsList,
    LotManagement
  },
  data() {
    return {
      categories: [],
      lots: [],
      filteredLots: [],
      localLot: {
        description: '',
        category: null,
        initialPrice: 0,
        customer: null
      },
      mainCategories: [],
      subcategories: [],
      selectedMainCategory: null,
      mode: null,
      error: null,
      success: null,
      selectedCustomer: null,
      filterStatus: 'active'
    };
  },
  async created() {
    this.selectedCustomer = CustomersServices.getSelectedCustomer();
    await this.fetchCategories();
    if (this.selectedCustomer) {
      await this.fetchLots();
    }
  },
  watch: {
    categories: {
      handler(newCategories) {
        this.mainCategories = newCategories.filter(cat => !cat.parentCategory);
      },
      immediate: true
    }
  },
  methods: {
    async fetchCategories() {
      try {
        this.categories = await CategoryService.getAllCategories();
      } catch (error) {
        this.displayMessage('error', "Erreur lors du chargement des catégories");
      }
    },
    async fetchLots() {
      try {
        const selectedCustomerObj = CustomersServices.getSelectedCustomer();
        if (!selectedCustomerObj) {
          throw new Error('Utilisateur non sélectionné ou invalide');
        }
        const customerLots = await LotsService.getLotsByCustomer(selectedCustomerObj);
        const pendingLots = await LotsService.getPendingLots();
        this.lots = [...customerLots, ...pendingLots]; // Combine both lists
        this.filterLots();
      } catch (error) {
        this.displayMessage('error', "Erreur lors du chargement des lots");
      }
    },
    filterLots() {
      this.filteredLots = this.lots.filter(lot => {
        if (this.filterStatus === 'active') {
          return lot.active;
        } else if (this.filterStatus === 'inactive') {
          return !lot.active;
        } else if (this.filterStatus === 'pending') {
          return !lot.active && lot.highestBidder != null; // Nouveau filtre
        }
      });
    },
    fetchSubcategories(mainCategoryId) {
      if (mainCategoryId) {
        this.subcategories = this.categories.filter(cat => cat.parentCategory && cat.parentCategory.id == mainCategoryId);
      } else {
        this.subcategories = [];
      }
    },
    async handleSubmit() {
      try {
        const selectedCustomerObj = CustomersServices.getSelectedCustomer();
        if (!selectedCustomerObj) {
          throw new Error('Utilisateur non sélectionné ou invalide');
        }
        this.localLot.customer = {id: selectedCustomerObj.id};
        this.localLot.highestBid = parseFloat(this.localLot.initialPrice); // Convert highestBid to a number
        this.localLot.active = true; // Set active to true

        await LotsService.addLot(this.localLot);
        await this.fetchLots();
        this.displayMessage('success', "Lot ajouté avec succès");
        this.resetForm();
      } catch (error) {
        this.displayMessage('error', "Erreur lors de l'ajout du lot");
      }
    },
    async confirmDeleteLot(lotId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce lot?")) {
        await this.deleteLot(lotId);
      }
    },
    async deleteLot(lotId) {
      try {
        await LotsService.deleteLot(lotId);
        await this.fetchLots();
        this.displayMessage('success', "Lot supprimé avec succès");
      } catch (error) {
        this.displayMessage('error', "Erreur lors de la suppression du lot");
      }
    },
    async confirmEndAuction(lotId) {
      if (confirm("Êtes-vous sûr de vouloir terminer les enchères pour ce lot?")) {
        await this.endAuction(lotId);
      }
    },
    async endAuction(lotId) {
      try {
        await LotsService.endAuction(lotId);
        await this.fetchLots();
        this.displayMessage('success', "Les enchères pour ce lot sont terminées");
      } catch (error) {
        this.displayMessage('error', "Erreur lors de la fin des enchères pour ce lot");
      }
    },
    resetForm() {
      this.localLot = {
        description: '',
        category: null,
        initialPrice: 0,
        customer: null
      };
      this.selectedMainCategory = null;
      this.subcategories = [];
    },
    updateLocalLot(newLocalLot) {
      this.localLot = newLocalLot;
    },
    goToHome() {
      this.$router.push({path: '/'});
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
  }
};
</script>

<style>
.manage-lots-background {
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

.button-group {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.button-group button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-group button:hover {
  background-color: #2980b9;
  color: white;
}

.filter-group {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  color: black;
}

.filter-group label {
  margin-right: 10px;
}

.filter-group select {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
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

h2 {
  color: black; /* Changed to black */
  text-align: center;
  margin-bottom: 10px;
}
</style>
