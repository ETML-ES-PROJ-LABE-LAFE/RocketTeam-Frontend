<template>
  <div class="notification-list" v-if="notifications.length">
    <div v-for="notification in notifications" :key="notification.id" class="notification">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notifications: {
      type: Array,
      required: true,
    }
  }
};
</script>

<style scoped>
.notification-list {
  position: absolute;
  right: 0;
  top: 50px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 300px;
}

.notification {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.notification:last-child {
  border-bottom: none;
}
</style>
