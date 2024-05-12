<!-- ListLotsView.vue -->
<template>
  <div class="lots-background">
    <div class="center-container">
      <h2>Sélection des lots</h2>
      <p>Veuillez sélectionner la catégorie principale de lots que vous voulez consulter</p>
      <div class="center-items">
        <CategorySelector :categories="categories" v-model="selectedCategory" @subcategory-selected="handleSubcategorySelected" />
      </div>
    </div>
    <!-- List of lots -->
    <div v-if="lots.length > 0">
      <h3>Liste des Lots</h3>
      <LotsList :lots="lots" />
    </div>
    <div v-else-if="selectedSubcategory && lots.length === 0">
      <p>Aucun lot trouvé pour cette sous-catégorie.</p>
    </div>
    <div v-else>
      <p>Sélectionnez une sous-catégorie pour afficher les lots.</p>
    </div>
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
    };
  },
  async created() {
    try {
      this.categories = await CategoryService.getAllCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
  methods: {
    async handleSubcategorySelected(selectedSubcategory) {
      this.selectedSubcategory = selectedSubcategory;
      await this.fetchSelectedSubcategoryLots();
    },

    async fetchSelectedSubcategoryLots() {
      try {
        this.lots = await LotsService.getLotsBySubcategory(this.selectedSubcategory);
      } catch (error) {
        console.error("Error fetching lots by subcategory:", error);
      }
    }
  }
};
</script>

<style>
/* Styles ici */
</style>
