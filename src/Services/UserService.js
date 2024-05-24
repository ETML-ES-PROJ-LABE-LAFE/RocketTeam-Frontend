import axios from 'axios';

const BASE_URL = "http://localhost:8080/users";

class UserService {

    async getAllUsers() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users');
        }
    }

    getSelectedUser() {
        return localStorage.getItem('selectedUser');
    }

    setSelectedUser(userId) {
        localStorage.setItem('selectedUser', userId);
    }
}

export default new UserService();