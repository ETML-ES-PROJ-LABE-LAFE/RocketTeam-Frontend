// src/Services/DashboardService.js
import axios from 'axios';

const BASE_URL = "http://localhost:8080/dashboard";

class DashboardService {
    async getLotsForSale(customerId) {
        const response = await axios.get(`${BASE_URL}/lotsForSale/${customerId}`);
        return response.data;
    }

    async getLotsSold(customerId) {
        const response = await axios.get(`${BASE_URL}/lotsSold/${customerId}`);
        return response.data;
    }

    async getLotsBid(customerId) {
        const response = await axios.get(`${BASE_URL}/lotsBid/${customerId}`);
        return response.data;
    }

    async getLotsOwned(customerId) {
        const response = await axios.get(`${BASE_URL}/lotsOwned/${customerId}`);
        return response.data;
    }

    async getLotsAffected(customerId) {
        const response = await axios.get(`${BASE_URL}/lotsAffected/${customerId}`);
        return response.data;
    }

    async getLotsVendues(customerId) {
        const response = await axios.get(`${BASE_URL}/lotsVendues/${customerId}`);
        return response.data;
    }

    async confirmPayment(lotId, userId) {
        const response = await axios.put(`${BASE_URL}/${lotId}/confirmPayment`, null, {
            params: { userId }
        });
        return response.data;
    }
}

export default new DashboardService();
