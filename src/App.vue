<template>
  <nav>
    <div class="nav-container">
      <div class="nav-links">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/lots">Lots</router-link> |
        <router-link v-if="selectedUser" to="/manage-lots">Gestion des Lots</router-link> |
      </div>
      <select v-model="selectedUserId" @change="userChanged" class="user-select">
        <option value="">Non connecté</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
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
      selectedUser: null,
      selectedUserId: null
    };
  },
  async created() {
    try {
      this.users = await UserService.getAllUsers();
      const selectedUser = UserService.getSelectedUser();
      if (selectedUser) {
        this.selectedUser = selectedUser;
        this.selectedUserId = selectedUser.id;
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },
  watch: {
    selectedUserId(newId) {
      if (newId) {
        this.selectedUser = this.users.find(user => user.id === Number(newId));
        UserService.setSelectedUser(this.selectedUser);
      } else {
        this.selectedUser = null;
        UserService.setSelectedUser(null);
      }
    }
  },
  methods: {
    userChanged() {
      this.$router.go(); // Reload the page by programmatically refreshing the router
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
  background: linear-gradient(to bottom right, #3498db, #bdc3c7); /* Ajout du fond global */
  color: white; /* Texte en blanc par défaut */
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

.user-select {
  padding: 5px;
  border-radius: 5px;
  width: 200px; /* Réduction de la taille */
  margin-left: auto; /* Pousse la liste déroulante vers la droite */
}
</style>
