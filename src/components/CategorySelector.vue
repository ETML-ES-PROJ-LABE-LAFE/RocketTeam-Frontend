<!-- CategorySelector.vue -->
<template>
  <div class="category-selector">
    <div class="main-categories">
      <button v-for="category in mainCategories" :key="category.id" @click="selectMainCategory(category)" :class="{ 'selected': selectedMainCategory && selectedMainCategory.id === category.id }">
        {{ category.name }}
      </button>
    </div>
    <select v-if="selectedMainCategory" v-model="selectedSubcategory" @change="handleSubcategoryChange">
      <option value="">Sélectionnez une sous-catégorie</option>
      <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">{{ subcategory.name }}</option>
    </select>
  </div>
</template>

<script>
import CategoryServices from '@/Services/CategoryServices.js';

export default {
  data() {
    return {
      mainCategories: [],
      selectedMainCategory: null,
      selectedSubcategory: '',
      subcategories: []
    };
  },
  async mounted() {
    this.fetchMainCategories();
  },
  methods: {
    async fetchMainCategories() {
      try {
        const allCategories = await CategoryServices.getAllCategories();
        this.mainCategories = allCategories.filter(category => !category.parentCategory);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories principales :', error);
      }
    },
    selectMainCategory(category) {
      this.selectedMainCategory = category;
      this.selectedSubcategory = '';
      this.fetchSubcategories(category.id);
    },
    async fetchSubcategories(parentCategoryId) {
      try {
        const allCategories = await CategoryServices.getAllCategories();
        this.subcategories = allCategories.filter(category => category.parentCategory && category.parentCategory.id === parentCategoryId);
      } catch (error) {
        console.error('Erreur lors de la récupération des sous-catégories :', error);
      }
    },
    handleSubcategoryChange() {
      this.$emit('subcategory-selected', this.selectedSubcategory);
    }
  }
};
</script>

<style scoped>
/* Styles ici */
</style>
