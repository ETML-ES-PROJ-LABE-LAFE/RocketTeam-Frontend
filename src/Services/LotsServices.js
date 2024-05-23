import axios from 'axios';

const BASE_URL = "http://localhost:8080/lots";

class LotsServices {

    async getAllLots() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching lots:', error);
            throw new Error('Failed to fetch lots');
        }
    }

    async getLotsBySubcategory(subcategoryId) {
        try {
            const response = await axios.get(`http://localhost:8080/categories/${subcategoryId}/lots`);
            return response.data;
        } catch (error) {
            console.error('Error fetching lots by subcategory:', error);
            throw new Error('Failed to fetch lots by subcategory');
        }
    }
}

export default new LotsServices();
