import axios from 'axios';

const BASE_URL = "http://localhost:8080/encheres";

class EnchereService {
    async placeEnchere(enchere) {
        try {
            const response = await axios.post(BASE_URL, enchere);
            return response.data;
        } catch (error) {
            console.error('Error placing bid:', error);
            throw new Error('Failed to place bid');
        }
    }
}

export default new EnchereService();
