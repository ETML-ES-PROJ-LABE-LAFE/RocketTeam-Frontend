import axios from 'axios';

const BASE_URL = "http://localhost:8080/users";

class UserService {

    async getAllUsers() {
        try {
            const response = await axios.get(BASE_URL);
            console.log('Fetched users:', response.data); // Log to check if all users are fetched
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