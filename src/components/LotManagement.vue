<template>
  <div>
    <div v-if="!selectedUser">
      <h2>Vous devez être connecté pour accéder à cette page.</h2>
      <router-link to="/"><button>Retour à l'accueil</button></router-link>
    </div>
    <div v-else>
      <div v-if="mode === 'add'">
        <form @submit.prevent="$emit('handleSubmit')">
          <div>
            <label for="description">Description</label>
            <textarea
                id="description"
                :value="localDescription"
                @input="updateDescription($event.target.value)"
                required
            ></textarea>
          </div>
          <div>
            <label for="mainCategory">Catégorie principale</label>
            <select
                id="mainCategory"
                v-model="selectedMainCategory"
                @change="handleMainCategoryChange"
                required
            >
              <option v-for="category in mainCategories" :key="category.id" :value="category">{{ category.name }}</option>
            </select>
          </div>
          <div>
            <label for="subcategory">Sous-catégorie</label>
            <select
                id="subcategory"
                v-model="localCategory"
                required
            >
              <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory">{{ subcategory.name }}</option>
            </select>
          </div>
          <div>
            <label for="initialPrice">Prix initial</label>
            <input
                type="number"
                id="initialPrice"
                :value="localInitialPrice"
                @input="updateInitialPrice($event.target.value)"
                required
            >
          </div>
          <button type="submit">Ajouter le Lot</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryServices from '@/Services/CategoryServices.js';

export default {
  props: {
    mainCategories: Array,
    localLot: Object,
    mode: String,
    selectedUser: Object
  },
  data() {
    return {
      selectedMainCategory: null,
      subcategories: [],
      localDescription: this.localLot.description,
      localCategory: this.localLot.category,
      localInitialPrice: this.localLot.initialPrice
    };
  },
  watch: {
    selectedMainCategory: {
      async handler(newCategory) {
        if (newCategory && newCategory.id) {
          this.subcategories = await this.fetchSubcategories(newCategory.id);
        } else {
          this.subcategories = [];
        }
      },
      immediate: true
    },
    localCategory: {
      handler(newCategory) {
        this.$emit('updateLocalLot', { ...this.localLot, category: newCategory });
      },
      immediate: true
    }
  },
  methods: {
    async handleMainCategoryChange() {
      this.subcategories = await this.fetchSubcategories(this.selectedMainCategory.id);
    },
    async fetchSubcategories(parentCategoryId) {
      try {
        const allCategories = await CategoryServices.getAllCategories();
        return allCategories.filter(category => category.parentCategory && category.parentCategory.id === parentCategoryId);
      } catch (error) {
        console.error('Erreur lors de la récupération des sous-catégories :', error);
        return [];
      }
    },
    updateDescription(description) {
      this.localDescription = description;
      this.$emit('updateLocalLot', { ...this.localLot, description });
    },
    updateCategory(category) {
      this.localCategory = category;
      this.$emit('updateLocalLot', { ...this.localLot, category });
    },
    updateInitialPrice(initialPrice) {
      this.localInitialPrice = initialPrice;
      this.$emit('updateLocalLot', { ...this.localLot, initialPrice });
    }
  }
};
</script>


<style>
.manage-lots-background {
  width: 100%;
  padding: 20px 0;
  background: linear-gradient(to bottom right, #3498db, #bdc3c7);
  color: white;
  min-height: 100vh;
}

.center-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: auto;
  width: 90%;
  max-width: 1100px;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.button-group button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-group button:hover {
  background-color: #2980b9;
  color: white;
}

.error-popup,
.success-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 30px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1050;
  max-width: 90%;
  text-align: center;
}

.error-popup {
  background-color: #fff;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.success-popup {
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #d6e9c6;
}

h2 {
  color: black;
  text-align: center;
  margin-bottom: 10px;
}

form > div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

textarea, select, input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
