<template>
  <div>
    <ul class="lots-list">
      <li v-for="lot in paginatedLots" :key="lot.id">
        <div @click="goToEnchere(lot.id)">
          <LotItem :lot="lot" :showDeleteButton="showDeleteButton" @delete-lot="$emit('delete-lot', lot.id)" />
          <button v-if="showEndAuctionButton && lot.active" :disabled="disabledButtons.includes(lot.id)" @click.stop="endAuction(lot.id)">
            Terminer les enchères
          </button>
        </div>
      </li>
    </ul>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <span class="pagination-text">Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </div>
</template>

<script>
import LotItem from './LotItem.vue';
import LotsService from "@/Services/LotsServices.js";

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
    },
    showEndAuctionButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      disabledButtons: []
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
      if (!this.showDeleteButton && !this.showEndAuctionButton) {
        const encodedId = LotsService.encodeId(lotId);
        this.$router.push({ name: 'enchere', params: { encodedId } });
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
    },
    resetPagination() {
      this.currentPage = 1;
    },
    async endAuction(lotId) {
      try {
        this.disabledButtons.push(lotId);
        await LotsService.endAuction(lotId);
        this.$emit('end-auction', lotId);
      } catch (error) {
        this.displayError('auctionError', "Erreur lors de l'enchère, veuillez essayer plus tard");
        this.disabledButtons = this.disabledButtons.filter(id => id !== lotId);
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
  color: black; /* Changed to black */
}

.lots-list {
  padding: 0;
  margin: 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-text {
  color: black; /* Changed to black */
  margin: 0 10px; /* Ajout d'un espacement pour le texte */
}
</style>
