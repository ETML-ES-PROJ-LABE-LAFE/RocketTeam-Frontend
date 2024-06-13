import axios from 'axios';

const BASE_URL = "http://localhost:8080/encheres";

class EnchereService {
    async placeEnchere(enchere) {
        try {
            const response = await axios.post(BASE_URL, {
                ...enchere,
                amount: Number(enchere.amount) // Assurez-vous que 'amount' est un nombre
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error('Failed to place enchere');
            }
        }
    }

    async getTotalBidAmountByCustomer(customerId) {
        try {
            const response = await axios.get(`${BASE_URL}/total/${customerId}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch total bid amount', error);
            throw error;
        }
    }

    async releaseReservedBalance(customerId, lotId) {
        try {
            await axios.get(`${BASE_URL}/release/${customerId}/${lotId}`);
        } catch (error) {
            throw new Error('Erreur vous empêchant de placer une enchère, veuillez réessayer plus tard');
        }
    }
}

export default new EnchereService();
