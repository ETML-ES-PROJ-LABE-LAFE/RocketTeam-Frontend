<template>
  <div class="lots-background">
    <div class="center-container">
      <h2>Sélection des lots</h2>
      <p>Veuillez sélectionner la catégorie principale de lots que vous voulez consulter</p>
      <div class="center-items">
        <CategorySelector :categories="categories" v-model="selectedCategory" @subcategory-selected="handleSubcategorySelected" />
      </div>
    </div>
    <!-- Pop-up for category error -->
    <div v-if="categoryError" class="error-popup">{{ categoryError }}</div>
    <!-- List of lots -->
    <div v-if="lots.length > 0">
      <h3>Liste des Lots</h3>
      <LotsList :lots="lots" />
    </div>
    <!-- Pop-up for lots error -->
    <div v-if="lotsError" class="error-popup">{{ lotsError }}</div>
  </div>
</template>

<script>
import LotsService from "@/Services/LotsServices.js";
import CategorySelector from "@/components/CategorySelector.vue";
import LotsList from "@/components/LotsList.vue";
import CategoryService from "@/Services/CategoryServices.js";

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
      console.error("Error fetching categories:", error);
      this.displayError('categoryError', "Erreur lors du chargement des catégories, veuillez essayer plus tard");
    }
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
    },

    async fetchSelectedSubcategoryLots() {
      try {
        this.lots = await LotsService.getLotsBySubcategory(this.selectedSubcategory);
        if (this.lots.length === 0) {
          throw new Error("Aucun lot trouvé pour cette sous-catégorie");
        }
      } catch (error) {
        console.error("Error fetching lots by subcategory:", error);
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
  background-color: #fff;
  color: black;
}

.center-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: auto;
  width: 90%;
  max-width: 1100px;
}

.error-popup {
  position: fixed; /* Fixe la position relative à la fenêtre du navigateur */
  top: 50%; /* Centre verticalement */
  left: 50%; /* Centre horizontalement */
  transform: translate(-50%, -50%); /* Ajuste le centrage pour compenser la taille du pop-up */
  background-color: #fff;
  color: #721c24;
  padding: 15px 30px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Ombre plus prononcée pour un meilleur contraste */
  z-index: 1050; /* Assurez-vous que le z-index soit assez haut pour être au-dessus des autres éléments */
  max-width: 90%; /* Limite la largeur pour éviter que le pop-up ne soit trop large */
  text-align: center;
}

h2, p {
  text-align: center;
  margin-bottom: 10px;
}
</style>