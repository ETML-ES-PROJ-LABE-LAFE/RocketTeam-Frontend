import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/notifications";

class NotificationService {
    async getNotificationsByUser(userId) {
        try {
            const response = await axios.get(`${BASE_URL}/user/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors du chargement des notifications');
        }
    }

    async markAsRead(id) {
        try {
            await axios.put(`${BASE_URL}/${id}/read`);
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour de la notification');
        }
    }
}

export default new NotificationService();
