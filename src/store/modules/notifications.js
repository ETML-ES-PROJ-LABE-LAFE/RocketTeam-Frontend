import axios from 'axios';

const state = {
    notifications: []
};

const getters = {
    allNotifications: state => state.notifications,
    unreadCount: state => state.notifications.filter(n => !n.read).length
};

const actions = {
    async fetchNotifications({ commit }) {
        const response = await axios.get('/api/notifications');
        commit('setNotifications', response.data);
    },
    async addNotification({ commit }, notification) {
        const response = await axios.post('/api/notifications', notification);
        commit('newNotification', response.data);
    },
    markAsRead({ commit }, id) {
        commit('markRead', id);
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
