<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-if="loading">Chargement en cours...</div>
    <div v-else>
      <h2>Employee Details</h2>
      <div v-if="lots.length > 0">
        <div v-for="lot in lots" :key="lot.id">
          <p><strong>Description:</strong> {{ lot.description }}</p>
          <p><strong>Catégories:</strong> {{ lot.category }}</p>
          <!-- <p><strong>Prix Initial:</strong> {{ lot.initialPrice }}</p>-->
          <p><strong>Prix le plus élevé:</strong> {{ lot.highestBid }}</p>
        </div>
      </div>
      <div v-else>
        <p>Aucun lot trouvé.</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LotsServices from "@/Services/LotsServices";

export default {
  name: 'HomeView',
  data() {
    return {
      lots: [],
      loading: true // Ajout de la propriété loading
    }
  },
  async created() {
    try {
      // Recherche des employés et remplissage du tableau employees
      this.lots = await LotsServices.getAllLots();
      this.loading = false; // Mettre loading à false une fois les données chargées
      console.log(this.lots)
    } catch (error) {
      console.log("Erreur " + error);
      this.loading = false; // En cas d'erreur, définir loading à false
    }
  }
}
</script>
