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
.lots-list {
  list-style-type: none;
  padding: 0;
}

.lots-list li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
