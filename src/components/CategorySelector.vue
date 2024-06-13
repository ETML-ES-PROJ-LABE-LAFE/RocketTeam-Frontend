<template>
  <div class="category-selector">
    <div v-if="displayMode === 'buttons'" class="main-categories">
      <button v-for="category in mainCategories" :key="category.id" @click="selectMainCategory(category)" :class="{ 'selected': selectedMainCategory && selectedMainCategory.id === category.id }">
        {{ category.name }}
      </button>
    </div>
    <div v-else>
      <label for="mainCategory">Catégorie principale</label>
      <select id="mainCategory" v-model="selectedMainCategory" @change="handleMainCategoryChange" required>
        <option v-for="category in mainCategories" :key="category.id" :value="category">{{ category.name }}</option>
      </select>
    </div>
    <div>
      <label v-if="displayMode !== 'buttons'" for="subcategory">Sous-catégorie</label>
      <select id="subcategory" v-model="selectedSubcategory" @change="handleSubcategoryChange">
        <option value="" disabled selected>Sélectionnez une sous-catégorie</option>
        <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">{{ subcategory.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import CategoryServices from '@/Services/CategoryServices.js';

export default {
  props: {
    displayMode: {
      type: String,
      default: 'buttons'
    }
  },
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
        this.displayError('categoryError', "Erreur lors du chargement des catégories principales, veuillez essayer plus tard");
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
        this.displayError('categoryError', "Erreur lors du chargement des catégories secondaires, veuillez essayer plus tard");
      }
    },
    handleMainCategoryChange() {
      this.fetchSubcategories(this.selectedMainCategory.id);
    },
    handleSubcategoryChange() {
      this.$emit('subcategory-selected', this.selectedSubcategory);
    }
  }
};
</script>

<style scoped>
.category-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-categories {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}

.main-categories button {
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 10px 20px;
  margin: 5px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.main-categories button:hover,
.main-categories button.selected {
  background-color: #3498db;
  color: white;
}

select {
  margin-top: 10px;
  width: auto; /* Augmenter la largeur pour éviter la troncation */
  padding: 10px 20px; /* Assure un padding similaire aux boutons pour uniformité */
  border-radius: 15px; /* Bords arrondis comme les boutons */
  border: 1px solid #ccc; /* Bordure similaire à celle des boutons */
  background-color: white; /* Fond blanc */
  cursor: pointer; /* Indique que c'est un élément interactif */
  outline: none; /* Supprime l'outline par défaut lors de la sélection */
  transition: background-color 0.3s, border-color 0.3s; /* Transition douce pour les interactions */
}

select option {
  font-size: 16px; /* Ajuste la taille de la police si nécessaire */
}

select:hover {
  background-color: #ecf0f1; /* Légère modification de couleur au survol pour un feedback visuel */
  border-color: #bdc3c7; /* Changement de la couleur de bordure au survol */
}

select:focus {
  border-color: #3498db; /* Bordure bleue lors de la focus pour indiquer l'élément actif */
}
</style>
