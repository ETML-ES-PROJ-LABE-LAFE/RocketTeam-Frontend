<template>
  <div class="lots-list">
    <!-- Loop through lots and display LotItem for each -->
    <LotItem v-for="lot in lots" :key="lot.id" :lot="lot" />
  </div>
</template>

<script>
import LotItem from './LotItem.vue';

export default {
  components: {
    LotItem,
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
  margin-top: 20px;
}
</style>
