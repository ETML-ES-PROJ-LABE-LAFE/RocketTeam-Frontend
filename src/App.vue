<template>
  <nav>
    <div class="nav-container">
      <div class="nav-links">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/lots">Lots</router-link> |
        <router-link to="/manage-lots">Gestion des Lots</router-link> |
      </div>
      <select v-model="selectedUser" @change="userChanged">
        <option value="" disabled>Choose User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.customername }}</option>
      </select>
    </div>
  </nav>
  <router-view/>
</template>

<script>
import UserService from '@/Services/UserService.js';

export default {
  data() {
    return {
      users: [],
      selectedUser: null
    };
  },
  async created() {
    try {
      this.users = await UserService.getAllUsers();
      console.log("Fetched users:", this.users); // Log to check if all users are fetched
      this.selectedUser = UserService.getSelectedUser();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  watch: {
    selectedUser(newValue) {
      if (newValue) {
        UserService.setSelectedUser(newValue);
        console.log('Selected user ID:', newValue);
      }
    }
  },
  methods: {
    userChanged() {
      UserService.setSelectedUser(this.selectedUser);
      console.log('Selected user ID:', this.selectedUser);
      // Optionally, trigger an event or action based on user change
    }
  }
};
</script>

<style>
/* Réinitialisation pour le body et html pour enlever les marges par défaut */
html, body {
  margin: 0;
  padding: 0;
  height: 100%; /* S'assure que le html et body prennent toute la hauteur */
  width: 100%; /* S'assure que le html et body prennent toute la largeur */
  overflow-x: hidden; /* Prévient le débordement horizontal */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh; /* Assure que l'app occupe au moins toute la hauteur de la fenêtre */
}

nav {
  display: flex; /* Utilise flexbox pour une disposition flexible */
  justify-content: space-between; /* Espacement entre les éléments */
  align-items: center; /* Centrage vertical des éléments */
  padding: 10px 20px; /* Espacement autour de la barre de navigation */
  background-color: #000; /* Fond noir pour la bannière */
  width: 100%; /* Assure que la nav occupe toute la largeur */
  margin: 0; /* Supprime toute marge par défaut */
}

.nav-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.nav-links {
  display: flex;
  align-items: center;
}

nav a {
  color: #fff; /* Texte blanc pour un contraste optimal avec le fond noir */
  font-weight: bold; /* Texte en gras */
  padding: 10px 20px; /* Padding autour du texte pour créer un effet de bouton */
  margin-right: 20px; /* Margin Right pour laisser un espace sur la droite */
  border-radius: 5px; /* Bords légèrement arrondis */
  text-decoration: none; /* Supprime le soulignement des liens */
  transition: background-color 0.3s, color 0.3s; /* Animation douce pour le survol */
}

nav a:hover {
  background-color: #3498db; /* Bleu clair pour le survol */
  color: #fff; /* Texte reste blanc lors du survol */
}

select {
  padding: 5px;
  border-radius: 5px;
}
</style>
