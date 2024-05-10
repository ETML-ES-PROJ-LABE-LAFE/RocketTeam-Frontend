// CategoryServices.js

import axios from 'axios';

const BASE_URL = "http://localhost:8080/categories";

class CategoryServices {
    async getAllCategories() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw new Error('Failed to fetch categories');
        }
    }

    // Autres méthodes pour ajouter, mettre à jour et supprimer des catégories peuvent être ajoutées ici
}

export default new CategoryServices();