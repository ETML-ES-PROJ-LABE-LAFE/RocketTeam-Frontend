<template>
  <div>
    <span>Solde: {{ balance }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      balance: state => state.customer ? state.customer.balance - state.customer.reservedBalance : 0
    })
  }
};
</script>

<style scoped>

</style>
