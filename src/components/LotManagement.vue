<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="description">Description</label>
      <textarea id="description" v-model="localLot.description" required></textarea>
    </div>
    <div>
      <label for="mainCategory">Catégorie principale</label>
      <select id="mainCategory" v-model="selectedMainCategory" @change="fetchSubcategories" required>
        <option v-for="category in mainCategories" :key="category.id" :value="category">{{ category.name }}</option>
      </select>
    </div>
    <div>
      <label for="subcategory">Sous-catégorie</label>
      <select id="subcategory" v-model="localLot.category" required>
        <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory">{{ subcategory.name }}</option>
      </select>
    </div>
    <div>
      <label for="initialPrice">Prix initial</label>
      <input type="number" id="initialPrice" v-model="localLot.initialPrice" required>
    </div>
    <button type="submit">Ajouter le Lot</button>
  </form>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    },
    lot: {
      type: Object,
      default: () => ({
        description: '',
        category: null,
        initialPrice: 0
      })
    }
  },
  data() {
    return {
      localLot: { ...this.lot },
      mainCategories: [],
      subcategories: [],
      selectedMainCategory: null
    };
  },
  watch: {
    categories: {
      handler(newCategories) {
        this.mainCategories = newCategories.filter(cat => !cat.parentCategory);
      },
      immediate: true
    },
    lot: {
      handler(newVal) {
        this.localLot = { ...newVal };
      },
      deep: true
    }
  },
  methods: {
    fetchSubcategories() {
      if (this.selectedMainCategory) {
        this.subcategories = this.categories.filter(cat => cat.parentCategory && cat.parentCategory.id === this.selectedMainCategory.id);
      } else {
        this.subcategories = [];
      }
    },
    handleSubmit() {
      this.$emit('submit', this.localLot);
    }
  }
};
</script>

<style scoped>
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
