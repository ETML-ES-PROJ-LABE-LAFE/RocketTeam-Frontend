import axios from 'axios';

const BASE_URL = "http://localhost:8080/dashboard";

class DashboardService {
    async getLotsForSale(customerId) {
        try {
            const response = await axios.get(`${BASE_URL}/lotsForSale/${customerId}`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors du chargement des lots en vente');
        }
    }

    async getLotsBid(customerId) {
        try {
            const response = await axios.get(`${BASE_URL}/lotsBid/${customerId}`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors du chargement des enchères');
        }
    }

    async getLotsOwned(customerId) {
        try {
            const response = await axios.get(`${BASE_URL}/lotsOwned/${customerId}`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors du chargement des lots possédés');
        }
    }

    async getLotsAffected(customerId) {
        try {
            const response = await axios.get(`${BASE_URL}/lotsAffected/${customerId}`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors du chargement des lots affectés');
        }
    }

    async getLotsSold(customerId) {
        try {
            const response = await axios.get(`${BASE_URL}/lotsSolds/${customerId}`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors du chargement des lots vendus');
        }
    }

    async confirmPayment(lotId, userId) {
        try {
            const response = await axios.put(`${BASE_URL}/${lotId}/confirmPayment`, null, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors de la confirmation du paiement');
        }
    }
}

export default new DashboardService();
