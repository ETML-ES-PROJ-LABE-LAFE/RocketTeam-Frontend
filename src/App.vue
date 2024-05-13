<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/lots">Lots</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex; /* Utilise flexbox pour une disposition flexible */
  justify-content: flex-end; /* Alignement à droite */
  padding: 10px 20px; /* Espacement autour de la barre de navigation */
  background-color: #000; /* Fond noir pour la bannière */
  width: 100%; /* Assure que la nav occupe toute la largeur pour permettre l'alignement à droite */
}

nav a {
  color: #fff; /* Texte blanc pour un contraste optimal avec le fond noir */
  font-weight: bold; /* Texte en gras */
  padding: 10px 20px; /* Padding autour du texte pour créer un effet de bouton */
  margin-right: 20px; /* Margin Right pour laisser un espace sur la droite*/
  border-radius: 5px; /* Bords légèrement arrondis */
  text-decoration: none; /* Supprime le soulignement des liens */
  margin-left: 10px; /* Ajoute un petit espace entre chaque bouton */
  transition: background-color 0.3s, color 0.3s; /* Animation douce pour le survol */
}

nav a:hover {
  background-color: #3498db; /* Bleu clair pour le survol */
  color: #fff; /* Texte reste blanc lors du survol */
}
</style>
<script setup>
</script>