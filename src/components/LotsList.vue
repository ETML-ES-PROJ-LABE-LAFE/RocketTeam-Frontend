<template>
  <div>
    <ul class="lots-list">
      <li v-for="lot in paginatedLots" :key="lot.id" @click="goToEnchere(lot.id)">
        <LotItem :lot="lot" :showDeleteButton="showDeleteButton" @delete-lot="$emit('delete-lot', lot.id)" />
      </li>
    </ul>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </div>
</template>

<script>
import LotItem from './LotItem.vue';

export default {
  components: {
    LotItem
  },
  props: {
    lots: {
      type: Array,
      required: true,
    },
    showDeleteButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.lots.length / this.itemsPerPage);
    },
    paginatedLots() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.lots.slice(start, end);
    }
  },
  methods: {
    goToEnchere(lotId) {
      if (!this.showDeleteButton) {
        this.$router.push({name: 'enchere', params: {id: lotId}});
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style scoped>
.lots-list li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  list-style-type: none;
  cursor: pointer;
}

.lots-list {
  padding: 0;
  margin: 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:hover {
  background-color: #2980b9;
  color: white;
}

.pagination span {
  margin: 0 10px;
  font-size: 16px;
}
</style>
