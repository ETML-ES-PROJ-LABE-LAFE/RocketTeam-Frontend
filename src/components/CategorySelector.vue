<template>
  <div class="category-selector-container">
    <div class="buttons-container">
      <button v-for="category in categories" :key="category.id" @click="selectCategory(category)"
              class="category-button" :class="{ 'selected': selectedCategory === category }">
        {{ category.name }}
      </button>
    </div>
    <select v-if="selectedCategory && subcategories.length > 0" v-model="selectedSubcategory" @change="updateSelectedSubcategory" class="select">
      <option disabled value="">Choisissez une sous-catégorie</option>
      <option v-for="subcat in subcategories" :value="subcat.id" :key="subcat.id">{{ subcat.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ['categories'],
  data() {
    return {
      selectedCategory: null,
      selectedSubcategory: null
    };
  },
  computed: {
    subcategories() {
      if (!this.selectedCategory) return [];
      return this.selectedCategory.subcategories || [];
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.selectedSubcategory = null; // Utilise `null` pour une réinitialisation claire
      this.$emit('category-selected', {category: category, filteredLots: category.lots || []});
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
  flex-wrap: wrap; /* Ajouté pour permettre aux boutons de passer à la ligne suivante si nécessaire */
  justify-content: center;
  width: 100%; /* S'assure que le conteneur des boutons utilise toute la largeur possible */
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
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  background-color: white;
  cursor: pointer;
}
</style>

