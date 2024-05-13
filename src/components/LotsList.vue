<template>
  <ul class="lots-list">
    <li v-for="lot in lots" :key="lot.id">
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
};
</script>

<style scoped>
.lots-list li {
  padding: 10px; /* Ajuste le padding si nécessaire pour aligner avec les barres */
  border-bottom: 1px solid #ccc; /* Vérifie si cette bordure est l'origine des barres blanches */
  list-style-type: none; /* Enlève les puces de liste */
}

.lots-list {
  padding: 0;
  margin: 0; /* Assure-toi qu'il n'y ait pas de marge externe ajoutant un espace indésirable */
}
</style>
