import axios from 'axios';

const BASE_URL = "http://localhost:8080/customers";

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
        const user = localStorage.getItem('selectedUser');
        return user ? JSON.parse(user) : null;
    }

    setSelectedUser(user) {
        localStorage.setItem('selectedUser', JSON.stringify(user));
    }

}

export default new UserService();
