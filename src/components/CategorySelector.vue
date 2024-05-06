<template>
  <div class="category-selector-container">
    <div class="buttons-container">
      <button v-for="category in mainCategories" :key="category.id" @click="selectCategory(category)"
              class="category-button" :class="{ 'selected': selectedCategory === category }">
        {{ category.name }}
      </button>
    </div>
    <select v-if="selectedCategory && selectedCategory.subcategories && selectedCategory.subcategories.length > 0" v-model="selectedSubcategory" @change="updateSelectedSubcategory" class="select">
      <option disabled value="">Choisissez une sous-catégorie</option>
      <option v-for="subcat in selectedCategory.subcategories" :value="subcat.id" :key="subcat.id">{{ subcat.name }}</option>
    </select>
  </div>
</template>

<script>
import CategoryServices from "@/Services/CategoryServices.js";

export default {
  data() {
    return {
      mainCategories: [],
      selectedCategory: null,
      selectedSubcategory: null
    };
  },
  async mounted() {
    try {
      const allCategories = await CategoryServices.getAllCategories();
      this.mainCategories = allCategories.filter(category => !category.parentCategory);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
  methods: {
    async selectCategory(category) {
      try {
        this.selectedCategory = category;
        // Récupérer les sous-catégories directement à partir de la catégorie parente
        const subcategories = category.subcategories;
        this.selectedCategory.subcategories = subcategories;
        this.selectedSubcategory = null; // Réinitialiser la sous-catégorie sélectionnée
        // Émettre l'événement avec la catégorie sélectionnée et les sous-catégories
        this.$emit('category-selected', {category: category, filteredLots: category.lots || []});
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    },


    updateSelectedSubcategory() {
      this.$emit('subcategory-selected', this.selectedSubcategory);
    },
  }
};
</script>

<style scoped>
.category-selector-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.category-button {
  margin: 5px;
  padding: 10px 15px;
  font-size: 16px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-button.selected, .category-button:hover {
  background-color: #007bff;
  color: white;
}

.select {
  display: block;
  margin-top: 20px;
  width: 100%;
  max-width: 300px;
  height: 40px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  cursor: pointer;
}
</style>
