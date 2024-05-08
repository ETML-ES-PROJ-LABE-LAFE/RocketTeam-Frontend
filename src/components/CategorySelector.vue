<template>
  <div class="category-selector">
    <div class="main-categories">
      <button v-for="category in mainCategories" :key="category.id" @click="selectMainCategory(category)" :class="{ 'selected': selectedMainCategory && selectedMainCategory.id === category.id }">
        {{ category.name }}
      </button>
    </div>
    <select v-if="selectedMainCategory" v-model="selectedSubcategory">
      <option value="">Select a subcategory</option>
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
      subcategories: [] // Ajout d'un nouveau tableau pour stocker les sous-catégories de la catégorie principale sélectionnée
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
        console.error('Error fetching main categories:', error);
      }
    },
    selectMainCategory(category) {
      this.selectedMainCategory = category;
      this.selectedSubcategory = ''; // Clear subcategory selection when main category changes
      this.fetchSubcategories(category.id); // Fetch subcategories associated with the selected main category
    },
    async fetchSubcategories(parentCategoryId) {
      try {
        const allCategories = await CategoryServices.getAllCategories();
        this.subcategories = allCategories.filter(category => category.parentCategory && category.parentCategory.id === parentCategoryId);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    },
  },
};
</script>

<style scoped>
.category-selector {
  margin-bottom: 20px;
}

.main-categories {
  display: flex;
  flex-wrap: wrap;
}

.main-categories button {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px 10px;
  font-size: 16px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.main-categories button.selected {
  background-color: #007bff;
  color: white;
}

.select {
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
</style>
