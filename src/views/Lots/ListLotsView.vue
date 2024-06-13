<template>
  <div class="lots-background">
    <div class="center-container">
      <h2>Sélection des lots</h2>
      <p class="centered-text">Veuillez sélectionner la catégorie principale de lots que vous voulez consulter</p>
      <div class="center-items">
        <CategorySelector displayMode="buttons" @subcategory-selected="handleSubcategorySelected" />
      </div>
    </div>
    <div v-if="categoryError" class="error-popup">{{ categoryError }}</div>
    <div v-if="lots.length > 0">
      <h3>Liste des Lots</h3>
      <LotsList :lots="lots" ref="lotsListRef" />
    </div>
    <div v-if="lotsError" class="error-popup">{{ lotsError }}</div>
  </div>
</template>

<script>
import LotsService from "@/Services/LotsServices.js";
import CategorySelector from "@/components/CategorySelector.vue";
import LotsList from "@/components/LotsList.vue";
import CategoryService from "@/Services/CategoryServices.js";
import CustomersServices from "@/Services/CustomersServices.js";

export default {
  name: 'ListLotsView',
  components: {
    CategorySelector,
    LotsList
  },
  data() {
    return {
      lots: [],
      categories: [],
      selectedCategory: null,
      selectedSubcategory: '',
      selectedCustomer: null,
      loading: true,
      categoryError: null,
      lotsError: null
    };
  },
  async created() {
    try {
      this.categories = await CategoryService.getAllCategories();
      if (this.categories.length === 0) {
        throw new Error("Aucune catégorie disponible");
      }
    } catch (error) {
      this.displayError('categoryError', "Erreur lors du chargement des catégories, veuillez essayer plus tard");
    }

    this.selectedCustomer = CustomersServices.getSelectedCustomer();
  },
  methods: {
    displayError(errorType, message) {
      this[errorType] = message;
      setTimeout(() => {
        this[errorType] = null;
      }, 3000);
    },

    async handleSubcategorySelected(selectedSubcategory) {
      this.selectedSubcategory = selectedSubcategory;
      await this.fetchSelectedSubcategoryLots();
      this.$refs.lotsListRef.resetPagination(); // Reset pagination to the first page
    },

    async fetchSelectedSubcategoryLots() {
      try {
        const allLots = await LotsService.getLotsBySubcategory(this.selectedSubcategory);
        this.lots = allLots.filter(lot => lot.active); // Filtrer les lots actifs
        if (this.lots.length === 0) {
          this.displayError('lotsError', "Aucun lot trouvé pour cette sous-catégorie");
        }
      } catch (error) {
        this.displayError('lotsError', "Erreur lors du chargement des lots, veuillez essayer plus tard");
      }
    }

  }
};
</script>

<style>
.lots-background {
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

.center-items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.error-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  color: #721c24;
  padding: 15px 30px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1050;
  max-width: 90%;
  text-align: center;
}

h2 {
  color: white;
  text-align: center;
  margin-bottom: 10px;
}

.centered-text {
  text-align: center;
  color: black; /* Changed to black */
  margin: 0 auto 10px;
}

.main-categories button {
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 10px 20px;
  margin: 5px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  color: black;
}

.main-categories button:hover,
.main-categories button.selected {
  background-color: #3498db;
  color: white;
}

.lots-list li {
  color: black;
}
</style>
