// CategoryServices.js

import axios from 'axios';

const BASE_URL = "http://localhost:8080/categories";

class CategoryServices {
    async getAllCategories() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors du chargement des catégories, veuillez essayer plus tard');
        }
    }
}

export default new CategoryServices();