import NotificationService from '@/Services/NotificationService.js';

const state = {
    notifications: []
};

const getters = {
    allNotifications: state => state.notifications,
    unreadCount: state => state.notifications.filter(n => !n.read).length
};

const actions = {
    async fetchNotifications({ commit }, userId) {
        try {
            const notifications = await NotificationService.getNotificationsByUser(userId);
            commit('setNotifications', notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    },
    async addNotification({ commit }, notification) {
        try {
            const newNotification = await NotificationService.addNotification(notification);
            commit('newNotification', newNotification);
        } catch (error) {
            console.error('Error adding notification:', error);
        }
    },
    async markAsRead({ commit }, id) {
        try {
            await NotificationService.markAsRead(id);
            commit('markRead', id);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    }
};

const mutations = {
    setNotifications: (state, notifications) => (state.notifications = notifications),
    newNotification: (state, notification) => state.notifications.unshift(notification),
    markRead: (state, id) => {
        const notification = state.notifications.find(n => n.id === id);
        if (notification) notification.read = true;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
