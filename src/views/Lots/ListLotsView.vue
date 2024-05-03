<template>
  <div>
    <h1 class="page-title">Que cherchez-vous ?</h1>
    <p class="page-description">Veuillez sélectionner la catégorie d'enchères que vous recherchez !</p>
    <CategorySelector :categories="categories" @category-selected="handleCategorySelected" @subcategory-selected="handleSubcategorySelected"/>
    <LotsList v-if="selectedCategory" :lots="filteredLots"/>
  </div>
</template>

<script>
import CategorySelector from "@/components/CategorySelector.vue";
import LotsList from "@/components/LotsList.vue";

export default {
  components: {
    CategorySelector,
    LotsList
  },
  data() {
    return {
      categories: [
        {
          id: 1,
          name: 'Meubles',
          subcategories: [
            { id: 1, name: 'Salon' },
            { id: 2, name: 'Chambre' }
          ],
          lots: [
            { id: 1, number: '001', description: 'Canapé', category: 'Meubles', sscategory: 'Salon', initialValue: '$100', highestBid: '$120' },
            { id: 2, number: '002', description: 'Chaise', category: 'Meubles', sscategory: 'Salon', initialValue: '$50', highestBid: '$70' },
            { id: 3, number: '003', description: 'Lit', category: 'Meubles', sscategory: 'Chambre', initialValue: '$150', highestBid: '$180' }
          ]
        },
        {
          id: 2,
          name: 'Vêtements',
          subcategories: [
            { id: 3, name: 'Hauts' },
            { id: 4, name: 'Bas' }
          ],
          lots: [
            { id: 4, number: '004', description: 'Pull', category: 'Vêtements', sscategory: 'Hauts', initialValue: '$30', highestBid: '$45' },
            { id: 5, number: '005', description: 'Jeans', category: 'Vêtements', sscategory: 'Bas', initialValue: '$40', highestBid: '$60' }
          ]
        }
      ],
      selectedCategory: null,
      filteredLots: []
    };
  },
  methods: {
    handleCategorySelected(selectedData) {
      this.selectedCategory = selectedData.category;
      this.filteredLots = selectedData.filteredLots;
    },
    handleSubcategorySelected(subcategoryId) {
      if (!this.selectedCategory || !subcategoryId) return;
      const selectedSubcategory = this.selectedCategory.subcategories.find(subcat => subcat.id === subcategoryId);
      if (!selectedSubcategory) return;
      this.filteredLots = this.selectedCategory.lots.filter(lot => lot.sscategory === selectedSubcategory.name);
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
