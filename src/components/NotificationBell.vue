<template>
  <div class="notification-bell">
    <button @click="toggleNotifications" class="bell-button">
      <i class="fa fa-bell"></i>
      <span v-if="unreadCount" class="unread-count">{{ unreadCount }}</span>
    </button>
    <div v-if="showNotifications" class="notification-list">
      <div v-for="notification in notifications" :key="notification.id" class="notification-item" @click="handleNotificationClick(notification)">
        <div class="notification-content">
          <p class="message">{{ getNotificationMessage(notification) }}</p>
          <p v-if="notification.message.includes('a trouvé un acheteur') || notification.message.includes('Vous avez remporté l\'enchère')" class="amount">Montant de l'enchère la plus haute: {{ notification.bidAmount }} €</p>
          <p class="timestamp">{{ timeAgo(notification.timestamp) }}</p>
          <button v-if="notification.message.includes('Vous avez remporté l\'enchère')" @click.stop="redirectToDashboard(notification.id)" class="pay-button">Payer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  props: ['userId'],
  data() {
    return {
      showNotifications: false
    };
  },
  computed: {
    ...mapGetters(['allNotifications', 'unreadCount']),
    notifications() {
      return this.allNotifications;
    }
  },
  methods: {
    ...mapActions(['fetchNotifications', 'markAsRead', 'deleteNotification']),
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications && this.userId) {
        this.fetchNotifications(this.userId);
      }
    },
    timeAgo(timestamp) {
      return moment(timestamp).fromNow();
    },
    handleNotificationClick(notification) {
      this.markNotificationAsRead(notification.id);
      this.deleteNotification(notification.id);
    },
    markNotificationAsRead(id) {
      this.markAsRead(id);
      this.deleteNotification(id);
    },
    redirectToDashboard(id) {
      this.markNotificationAsRead(id);
      this.showNotifications = false;
      this.$router.push({ name: 'dashboard' });
    },
    getNotificationMessage(notification) {
      if (notification.message.includes("n'a pas trouvé d'acheteur")) {
        return `Votre lot ${notification.lot.description} n'a pas trouvé d'acheteur.`;
      } else if (notification.message.includes('a trouvé un acheteur')) {
        return `Votre lot ${notification.lot.description} a trouvé un acheteur.`;
      } else if (notification.message.includes('a été vendu')) {
        return `Votre lot ${notification.lot.description} a été vendu.`;
      } else if (notification.message.includes("Vous avez remporté l'enchère")) {
        return `Félicitations ! Vous avez remporté l'enchère pour le lot: ${notification.lot.description}.`;
      } else {
        return notification.message;
      }
    }
  },
  mounted() {
    this.$router.afterEach(() => {
      this.showNotifications = false;
    });
  }
};
</script>

<style scoped>
.notification-bell {
  position: relative;
  display: inline-block;
}

.bell-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #ffffff; /* Couleur de la cloche */
  position: relative;
}

.unread-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.2em 0.5em;
  font-size: 0.8rem;
}

.notification-list {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff; /* Couleur de fond des notifications */
  color: #333333; /* Couleur du texte des notifications */
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: 10px;
  border: 1px solid #ddd;
}

.notification-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer; /* Ajout du curseur pointer pour indiquer que la notification est cliquable */
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-content {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrer le contenu horizontalement */
}

.message {
  margin: 0;
  font-weight: bold;
  color: #333333; /* Couleur du message */
  text-align: center; /* Centrer le texte */
}

.amount {
  margin: 0;
  font-size: 0.9rem;
  color: #555555; /* Couleur du montant */
}

.timestamp {
  margin: 0;
  font-size: 0.8rem;
  color: #777777; /* Couleur de l'horodatage */
  text-align: center; /* Centrer le texte */
}

.pay-button {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  background-color: #3498db; /* Couleur du bouton payer */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pay-button:hover {
  background-color: #2980b9;
}
</style>
