<template>
  <div class="lots-background">
    <CategorySelector :categories="categories" v-model="selectedCategory" @category-selected="handleCategorySelected" />
    <div v-if="selectedCategory">
      <select v-if="subcategories && subcategories.length > 0" v-model="selectedSubcategory">
        <option value="">Select a subcategory</option>
        <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">{{ subcategory.name }}</option>
      </select>
    </div>
    <LotList v-if="selectedCategory && selectedSubcategory" :lots="filteredLots" />
  </div>
</template>

<script>
import LotList from "@/components/LotsList.vue";
import LotsService from "@/Services/LotsServices.js";
import LotsCategory from "@/Services/CategoryServices.js";
import CategorySelector from "@/components/CategorySelector.vue";

export default {
  name: 'ListLotsView',
  components: {
    LotList,
    CategorySelector
  },
  data() {
    return {
      lots: [],
      loading: true,
      searchQuery: '',
      selectedCategory: null,
      selectedSubcategory: '',
      categories: []
    };
  },
  computed: {
    filteredLots() {
      const filtered = this.lots.filter(lot => {
        const categoryMatch = this.selectedCategory.id === lot.category.id;
        const subcategoryMatch = !this.selectedSubcategory || this.selectedSubcategory === lot.subcategory.id;
        const searchMatch = this.searchQuery === '' || lot.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        return categoryMatch && subcategoryMatch && searchMatch;
      });
      return filtered;
    },
    subcategories() {
      return this.selectedCategory ? this.selectedCategory.subcategories : [];
    }
  },
  async created() {
    try {
      this.lots = await LotsService.getAllLots();
      this.categories = await LotsCategory.getCategories();
    } catch (error) {
      console.error("Error fetching lots:", error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    handleCategorySelected(event) {
      this.selectedCategory = event.category;
      this.selectedSubcategory = ''; // Reset selected subcategory
    },
  }
};
</script>

<style>
.lots-background {
  min-height: calc(100vh - 80px);
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
  padding-left: 10%;
}
</style>
