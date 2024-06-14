<template>
  <div class="notification-bell">
    <button @click="toggleNotifications">
      <i class="fa fa-bell"></i>
      <span v-if="unreadCount" class="unread-count">{{ unreadCount }}</span>
    </button>
    <div v-if="showNotifications" class="notification-list">
      <div v-for="notification in notifications" :key="notification.id" class="notification-item">
        <img v-if="notification.user.avatarUrl" :src="notification.user.avatarUrl" alt="Avatar" class="avatar">
        <div class="notification-content">
          <p class="message">{{ notification.message }}</p>
          <p class="amount">Montant de l'enchère: {{ notification.bidAmount }} €</p>
          <p class="timestamp">{{ timeAgo(notification.timestamp) }}</p>
          <router-link :to="{ name: 'enchere', params: { encodedId: encodeId(notification.lot.id) } }">Voir le lot</router-link>
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
    ...mapActions(['fetchNotifications']),
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications && this.userId) {
        this.fetchNotifications(this.userId);
      }
    },
    timeAgo(timestamp) {
      return moment(timestamp).fromNow();
    },
    encodeId(id) {
      return window.btoa(id.toString());
    }
  }
};
</script>

<style scoped>
.notification-bell {
  position: relative;
  margin-right: 20px;
}

.notification-bell button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: yellow; /* Changez la couleur ici */
}

.unread-count {
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.2em 0.5em;
}

.notification-list {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 300px;
  z-index: 1000;
}

.notification-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.notification-item:last-child {
  border-bottom: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.notification-content {
  display: flex;
  flex-direction: column;
}

.message {
  margin: 0;
  font-weight: bold;
}

.amount {
  margin: 0;
  font-size: 0.9rem;
  color: gray;
}

.timestamp {
  margin: 0;
  font-size: 0.8rem;
  color: gray;
}
</style>
