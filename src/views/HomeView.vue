<template>
  <div class="home">
    <img src="@/assets/auction_logo.png" alt="Logo de AuctionHouse" class="logo">
    <h1>Bienvenue sur AuctionHouse!</h1>
    <p>Bienvenue sur AuctionHouse, votre plateforme innovante d’enchères en ligne, où la passion de l’achat rencontre la simplicité de la vente. Que vous soyez acheteur à la recherche d'objets uniques ou vendeur désireux de trouver de nouveaux acquéreurs pour vos trésors, notre site est le carrefour idéal pour connecter des personnes partageant les mêmes intérêts.</p>
    <p>Chez AuctionHouse, nous vous proposons une expérience d’enchères transparente et sécurisée. Acheteurs, parcourez une vaste sélection de catégories et découvrez des articles rares, des objets de collection ou même des produits du quotidien à des prix compétitifs. Vendeurs, bénéficiez de notre plateforme intuitive pour lister vos articles et atteindre une large audience, augmentant ainsi vos chances de réussite.</p>
    <p>Nous sommes ravis de vous accueillir sur AuctionHouse. Explorez, enchérissez, et profitez de toutes les opportunités que nous offrons. Nous vous souhaitons une excellente expérience parmi nous et une très bonne journée !</p>
  </div>
</template>

<script>
import LotsServices from "@/Services/LotsServices";

export default {
  name: 'HomeView',
  data() {
    return {
      lots: [],
      loading: true,
      error: null
    };
  },
  async created() {
    try {
      this.lots = await LotsServices.getAllLots();
      if (!this.lots.length) {
        throw new Error("Aucun lot disponible");
      }
    } catch (error) {
      this.error = "Erreur de chargement: " + error.message;
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style>
.home {
  font-family: 'Arial', sans-serif;
  padding: 10px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items at the start of the container */
  min-height: 100vh;
  background: linear-gradient(to bottom right, #3498db, #bdc3c7);
  color: white;
}

.logo {
  width: 150px;
  height: auto;
  margin-top: 40px; /* Add margin to the top */
}

h1 {
  margin-bottom: 20px;
  font-size: 2.5em;
  margin-top: 20px; /* Adjusted margin-top */
}

p {
  font-size: 23px;
  margin-top: 0;
  margin-bottom: 15px;
  line-height: 1.6;
  max-width: 800px;
  text-align: justify;
}
</style>
