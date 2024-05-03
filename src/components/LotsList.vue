<template>
  <div>
    <LotItem v-for="lot in lots" :key="lot.id" :lot="lot"/>
  </div>
</template>

<script>
import LotItem from "@/components/LotItem.vue";

export default {
  components: {
    LotItem
  },
  props: ['lots']
};
</script>

<style scoped>
.lot {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.lot:hover {
  transform: translateY(-5px);
}
</style>
