<template>
  <div class="action-buttons">
    <button class="btn btn-blue" @click="goBack">Retour à la liste</button>
    <button class="btn btn-green" @click="placeBid" :disabled="!selectedUser">Enchérir</button>
    <button class="btn btn-red" @click="removeLot">Retirer le lot de la vente</button>
  </div>
</template>

<script>
export default {
  props: {
    lot: {
      type: Object,
      required: true,
    },
    selectedUser: {
      type: Object,
      default: null,
    },
  },
  methods: {
    goBack() {
      this.$emit('go-back');
    },
    placeBid() {
      this.$emit('place-bid');
    },
    removeLot() {
      if (confirm("Êtes-vous sûr de vouloir retirer ce lot de la vente ?")) {
        this.$emit('remove-lot');
      }
    }
  }
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: white;
}

.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-blue {
  background-color: #3498db;
}

.btn-blue:hover {
  background-color: #2980b9;
}

.btn-green {
  background-color: #2ecc71;
}

.btn-green:hover {
  background-color: #27ae60;
}

.btn-red {
  background-color: #e74c3c;
}

.btn-red:hover {
  background-color: #c0392b;
}
</style>
