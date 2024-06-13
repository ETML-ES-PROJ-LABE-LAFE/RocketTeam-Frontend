<template>
  <div class="notification-bell">
    <button @click="toggleNotifications">
      <i class="fa fa-bell"></i>
      <span v-if="unreadCount">{{ unreadCount }}</span>
    </button>
    <div v-if="showNotifications" class="notification-list">
      <div v-for="notification in notifications" :key="notification.id" class="notification">
        {{ notification.message }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
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
      if (this.showNotifications) {
        this.fetchNotifications();
      }
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

.notification-bell span {
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

.notification {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.notification:last-child {
  border-bottom: none;
}
</style>
