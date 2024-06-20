<template>
  <div class="notification-bell">
    <button @click="toggleNotifications" class="bell-button">
      <img :src="currentNotificationIcon" alt="Notification Bell" class="bell-icon">
      <span v-if="unreadCount" class="unread-count">{{ unreadCount }}</span>
    </button>
    <div v-if="showNotifications" class="notification-list">
      <div v-for="notification in notifications" :key="notification.id" class="notification-item" @click="handleNotificationClick(notification)">
        <div class="notification-content">
          <p class="message">{{ getNotificationMessage(notification) }}</p>
          <p v-if="notification.message.includes('a trouvé un acheteur')" class="amount">Montant de l'enchère la plus haute: {{ notification.bidAmount }} €</p>
          <button v-if="notification.message.includes('Vous avez remporté l\'enchère')" @click.stop="redirectToDashboard(notification.id)" class="pay-button">Payer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import bellIcon from '@/assets/bell.png';
import notificationIcon from '@/assets/notification.png';

export default {
  props: ['userId'],
  data() {
    return {
      showNotifications: false,
      bellIcon: bellIcon,
      notificationIcon: notificationIcon
    };
  },
  computed: {
    ...mapGetters(['allNotifications', 'unreadCount']),
    notifications() {
      return this.allNotifications;
    },
    currentNotificationIcon() {
      return this.unreadCount > 0 ? this.notificationIcon : this.bellIcon;
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
    async handleNotificationClick(notification) {
      await this.markNotificationAsRead(notification.id);
      await this.deleteNotification(notification.id);
      // Mettre à jour les notifications locales pour qu'elles disparaissent de l'affichage
      const index = this.notifications.findIndex(n => n.id === notification.id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },
    async markNotificationAsRead(id) {
      await this.markAsRead(id);
    },
    async redirectToDashboard(id) {
      await this.markNotificationAsRead(id);
      await this.deleteNotification(id);
      this.showNotifications = false;
      this.$router.push({name: 'dashboard'});
    },
    getNotificationMessage(notification) {
      if (notification.message.includes("n'a pas trouvé d'acheteur")) {
        return `Votre lot ${notification.lot.description} n'a pas trouvé d'acheteur.`;
      } else if (notification.message.includes('a trouvé un acheteur')) {
        return `Votre lot ${notification.lot.description} a trouvé un acheteur.`;
      } else if (notification.message.includes('a été vendu')) {
        return `Votre lot ${notification.lot.description} a été vendu.`;
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
  color: #ffffff;
  position: relative;
}

.bell-icon {
  width: 30px;
  height: auto;
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
  background-color: #ffffff;
  color: #333333;
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
  cursor: pointer;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.message {
  margin: 0;
  font-weight: bold;
  color: #333333;
  text-align: center;
}

.amount {
  margin: 0;
  font-size: 0.9rem;
  color: #555555;
}

.timestamp {
  margin: 0;
  font-size: 0.8rem;
  color: #777777;
  text-align: center;
}

.pay-button {
  margin-top: 10px;
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pay-button:hover {
  background-color: #2980b9;
}
</style>
