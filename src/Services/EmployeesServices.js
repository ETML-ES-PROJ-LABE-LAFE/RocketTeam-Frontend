import axios from 'axios';

const BASE_URL = "http://localhost:8080/employees";

class EmployeesService {

    async getAllEmployees() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw new Error('Failed to fetch employees');
        }
    }

    // Autres méthodes pour ajouter, mettre à jour et supprimer des employés peuvent être ajoutées ici
}

export default new EmployeesService();
