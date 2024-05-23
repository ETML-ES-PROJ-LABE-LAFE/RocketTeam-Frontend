<template>
  <div class="home">
    <img src="../assets/auction_logo.png" alt="Logo de AuctionHouse" class="logo">
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
  padding: 0 20px; /* Supprime le padding vertical mais garde un padding horizontal */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Alignement au début pour réduire l'espace en haut */
  min-height: 100vh;
  background-color: #f4f4f9;
}

.logo {
  width: 150px;
  height: auto;
  margin-top: 20px; /* Réduit ou ajuste cette marge pour diminuer l'espace au-dessus du logo */
  margin-bottom: 10px;
}

h1 {
  margin-top: 0; /* Élimine la marge au-dessus du titre */
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  color: #555;
  margin-top: 0; /* Élimine la marge au-dessus du premier paragraphe */
  margin-bottom: 10px;
  line-height: 1.6;
  max-width: 800px;
  text-align: justify;
}
</style>