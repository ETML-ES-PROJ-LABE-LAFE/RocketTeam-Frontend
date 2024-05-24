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
        const selectedUser = localStorage.getItem('selectedUser');
        console.log('Selected user from localStorage:', selectedUser); // Log the selected user
        return selectedUser;
    }

    setSelectedUser(userId) {
        console.log('Setting selected user to localStorage:', userId); // Log the user being set
        localStorage.setItem('selectedUser', userId);
    }
}

export default new UserService();
