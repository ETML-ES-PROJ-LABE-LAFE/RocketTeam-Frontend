<template>
  <div>
    <h1 class="page-title">Que cherchez-vous ?</h1>
    <p class="page-description">Veuillez sélectionner la catégorie d'enchères que vous recherchez !</p>
    <CategorySelector :categories="categories" @category-selected="handleCategorySelected" @subcategory-selected="handleSubcategorySelected"/>
    <LotsList v-if="lots.length > 0" :lots="lots"/>
  </div>
</template>

<script>
import CategorySelector from "@/components/CategorySelector.vue";
import LotsList from "@/components/LotsList.vue";
import CategoryServices from "@/Services/CategoryServices.js";

export default {
  components: {
    CategorySelector,
    LotsList
  },
  data() {
    return {
      categories: [],
      lots: []
    };
  },
  async mounted() {
    try {
      // Récupérer toutes les catégories du backend lors du montage du composant
      this.categories = await CategoryServices.getAllCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
  methods: {
    async handleCategorySelected(selectedData) {
      try {
        // Si une catégorie principale est sélectionnée, récupérer tous les lots associés à cette catégorie
        if (selectedData.category.parentCategory === null) {
          this.lots = selectedData.category.lots || [];
        }
        // Si une sous-catégorie est sélectionnée, récupérer tous les lots associés à cette sous-catégorie
        else {
          const subcategory = selectedData.category;
          const parentCategory = await CategoryServices.getParentCategory(subcategory.id);
          this.lots = parentCategory.lots || [];
        }
      } catch (error) {
        console.error('Error fetching lots:', error);
      }
    }
  }
};
</script>

<style scoped>
.page-title {
  font-size: 36px;
  font-weight: bold;
  color: black;
  text-align: center;
  margin-top: 50px;
}

.page-description {
  font-size: 16px;
  color: #666666;
  text-align: center;
  margin-bottom: 20px;
}
</style>
