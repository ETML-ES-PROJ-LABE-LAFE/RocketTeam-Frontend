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
    async markAsRead({ commit }, id) {
        try {
            await NotificationService.markAsRead(id);
            commit('markRead', id);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    },
    async deleteNotification({ commit }, id) {
        try {
            await NotificationService.deleteNotification(id);
            commit('deleteNotification', id);
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    }
};

const mutations = {
    setNotifications: (state, notifications) => (state.notifications = notifications),
    markRead: (state, id) => {
        const notification = state.notifications.find(n => n.id === id);
        if (notification) notification.read = true;
    },
    deleteNotification: (state, id) => {
        state.notifications = state.notifications.filter(n => n.id !== id);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
