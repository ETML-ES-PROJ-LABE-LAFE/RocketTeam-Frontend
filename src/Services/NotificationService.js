import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/notifications";

class NotificationService {
    async getNotificationsByUser(userId) {
        try {
            const response = await axios.get(`${BASE_URL}/user/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur, nous ne pouvons pas afficher les notifications actuellement. Veuillez réessayer plus tard');
        }
    }

    async addNotification(notification) {
        try {
            const response = await axios.post(BASE_URL, JSON.stringify(notification), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('La notification n\'a pas pu être ajoutée, veuillez essayer plus tard');
        }
    }

    async markAsRead(notificationId) {
        try {
            const response = await axios.put(`${BASE_URL}/${notificationId}/read`);
            return response.data;
        } catch (error) {
            throw new Error('La notification n\'a pas pu être marquée comme lue, veuillez essayer plus tard');
        }
    }
}

export default new NotificationService();
