<template>
  <ul class="lots-list">
    <li v-for="lot in lots" :key="lot.id" @click="goToEnchere(lot.id)">
      <LotItem :lot="lot" />
    </li>
  </ul>
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
  },
  methods: {
    goToEnchere(lotId) {
      this.$router.push({ name: 'enchere', params: { id: lotId } });
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
</style>
