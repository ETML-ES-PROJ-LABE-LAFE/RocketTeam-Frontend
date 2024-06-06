<template>
  <nav>
    <div class="nav-container">
      <div class="nav-links">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/lots">Lots</router-link> |
        <router-link v-if="selectedUser" to="/manage-lots">Gestion des Lots</router-link> |
        <router-link v-if="selectedUser" to="/dashboard">Tableau de Bord</router-link> <!-- Nouveau lien -->
      </div>
      <div class="logo-container">
        <img src="@/assets/auction_logo.png" alt="Logo" class="logo">
      </div>
      <div class="user-select-container">
        <select v-model="selectedUserId" @change="userChanged" class="user-select">
          <option value="">Non connecté</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
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
  display: flex;
  justify-content: center; /* Centre le contenu horizontalement */
  align-items: center; /* Centre le contenu verticalement */
  padding: 10px 20px;
  background-color: #000;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  position: relative;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-links {
  display: flex;
  align-items: center;
}

.logo-container {
  position: absolute; /* Positionnement absolu pour centrer le logo */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* S'assure que le conteneur prend toute la hauteur de la barre de navigation */
}

.logo-container img {
  height: 50px; /* Ajuste la taille du logo */
  width: auto; /* Maintient le ratio aspect pour éviter la déformation */
}

.user-select-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

nav a {
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  margin-right: 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

nav a:hover {
  background-color: #3498db;
  color: #fff;
}

.user-select {
  padding: 8px 12px;
  border-radius: 5px;
  width: 250px;
  margin-left: 10px;
  border: 1px solid #ccc;
  background-color: white;
  color: black;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.user-select:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}
</style>
