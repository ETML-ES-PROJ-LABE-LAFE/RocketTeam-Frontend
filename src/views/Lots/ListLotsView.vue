<template>
  <div class="lots-background">
    <div class="center-container">
      <h2>Sélection des lots</h2>
      <p>Veuillez sélectionner la catégorie principale de lots que vous voulez consulter</p>
      <div class="center-items">
        <CategorySelector :categories="categories" v-model="selectedCategory" @category-selected="handleCategorySelected" />
        <select v-if="subcategories && subcategories.length > 0" v-model="selectedSubcategory" class="center-select">
          <option value="">Select a subcategory</option>
          <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">{{ subcategory.name }}</option>
        </select>
      </div>
    </div>
    <!-- List of lots -->
    <div v-if="lots.length > 0">
      <h3>Liste des Lots</h3>
      <ul class="lots-list">
        <li v-for="lot in lots" :key="lot.id">
          {{ lot.description }} - Catégorie: {{ lot.category.name }} - Prix initial: {{ lot.initialPrice }} - Offre la plus élevée: {{ lot.highestBid }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun lot trouvé.</p>
    </div>
  </div>
</template>

<script>
//import components and Services
/*import LotList from "@/components/LotsList.vue";*/
import LotsService from "@/Services/LotsServices.js";
/*import LotsCategory from "@/Services/CategoryServices.js";*/
import CategorySelector from "@/components/CategorySelector.vue";

export default {
  name: 'ListLotsView',
  components: {
    /*LotList,*/
    CategorySelector
  },
  data() {
    return {
      lots: [],
      categories: [],
      selectedCategory: null,
      selectedSubcategory: '',
      loading: true,
    };
  },
  computed: {
    filteredLots() {
      const filtered = this.lots.filter(lot => {
        const categoryMatch = this.selectedCategory.id === lot.category.id;
        const subcategoryMatch = !this.selectedSubcategory || this.selectedSubcategory === lot.subcategory.id;
        const searchMatch = this.searchQuery === '' || lot.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        return categoryMatch && subcategoryMatch && searchMatch;
      });
      return filtered;
    },
    subcategories() {
      return this.selectedCategory ? this.selectedCategory.subcategories : [];
    }
  },
  async created() {
    try {
      this.lots = await LotsService.getAllLots();
    } catch (error) {
      console.error("Error fetching lots:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    handleCategorySelected(event) {
      this.selectedCategory = event.category;
      this.selectedSubcategory = ''; // Reset selected subcategory
    },
  }
};
</script>

<style>
.lots-background {
  min-height: calc(100vh - 80px);
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column; /* Pour aligner les éléments en colonne */
  justify-content: flex-start; /* Pour aligner les éléments en haut de la page */
  align-items: center; /* Pour centrer horizontalement */
  padding-top: 20px;
}

.center-container {
  text-align: center; /* Centrer le texte horizontalement */
}

.center-items {
  margin-top: 20px; /* Ajouter un espace au-dessus des éléments */
  display: flex; /* Utilisation de flexbox pour centrer les éléments */
  flex-direction: column; /* Pour aligner les éléments en colonne */
  align-items: center; /* Pour centrer horizontalement */
}

.center-select {
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.lots-list {
  list-style-type: none;
  padding: 0;
}

.lots-list li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>