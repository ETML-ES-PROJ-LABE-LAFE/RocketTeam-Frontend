<template>
  <div class="manage-lots-background">
    <div class="center-container">
      <div v-if="!selectedUser">
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
        <LotManagement
            v-if="mode === 'add'"
            :mainCategories="mainCategories"
            :subcategories="subcategories"
            :selectedMainCategory="selectedMainCategory"
            :localLot="localLot"
            :mode="mode"
            :selectedUser="selectedUser"
            @fetchSubcategories="fetchSubcategories"
            @handleSubmit="handleSubmit"
            @updateLocalLot="updateLocalLot"
            @update:selectedMainCategory="selectedMainCategory = $event"
        />
        <LotsList
            v-if="mode === 'remove'"
            :lots="lots"
            :showDeleteButton="true"
            :showEndAuctionButton="true"
            @delete-lot="confirmDeleteLot"
            @end-auction="endAuction"
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
import UserService from "@/Services/UserService.js";

export default {
  components: {
    LotsList,
    LotManagement
  },
  data() {
    return {
      categories: [],
      lots: [],
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
      selectedUser: null
    };
  },
  async created() {
    this.selectedUser = UserService.getSelectedUser();
    await this.fetchCategories();
    if (this.selectedUser) {
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
        this.lots = await LotsService.getLotsByCustomer(this.selectedUser);
      } catch (error) {
        this.displayMessage('error', "Erreur lors du chargement des lots");
      }
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
        this.localLot.customer = { id: this.selectedUser };
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
      this.$router.push({ path: '/' });
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

form > div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
  color: black; /* Changed to black */
}

textarea, select, input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
