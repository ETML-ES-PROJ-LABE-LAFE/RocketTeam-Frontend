import axios from 'axios';

const BASE_URL = "http://localhost:8080/lots";

class LotsServices {

    async getAllLots() {
        try {
            const response = await axios.get(BASE_URL);
            console.log("getAllLots response:", response.data); // Log response
            return response.data;
        } catch (error) {
            console.error('Error fetching lots:', error);
            throw new Error('Failed to fetch lots');
        }
    }

    async getLotById(lotId) {
        try {
            const response = await axios.get(`${BASE_URL}/${lotId}`);
            console.log("getLotById response for id", lotId, ":", response.data); // Log response
            return response.data;
        } catch (error) {
            console.error('Error fetching lot:', error);
            throw new Error('Failed to fetch lot');
        }
    }

    async getLotsBySubcategory(subcategoryId) {
        try {
            const response = await axios.get(`${BASE_URL}/categories/${subcategoryId}/lots`);
            console.log("getLotsBySubcategory response for subcategory", subcategoryId, ":", response.data); // Log response
            return response.data;
        } catch (error) {
            console.error('Error fetching lots by subcategory:', error);
            throw new Error('Failed to fetch lots by subcategory');
        }
    }

    async placeBid(lotId, bidAmount) {
        try {
            const response = await axios.put(`${BASE_URL}/${lotId}/placeBid`, null, {
                params: {bidAmount}
            });
            console.log("placeBid response for id", lotId, "with amount", bidAmount, ":", response.data); // Log response
            return response.data;
        } catch (error) {
            console.error('Error placing bid:', error);
            throw new Error('Failed to place bid');
        }
    }

    async removeLot(lotId) {
        try {
            await axios.delete(`${BASE_URL}/${lotId}/remove`);
            console.log("removeLot response for id", lotId); // Log response
        } catch (error) {
            console.error('Error removing lot:', error);
            throw new Error('Failed to remove lot');
        }
    }

    async getLotsBySubcategoryAndCustomer(subcategoryId, customerId) {
        try {
            const response = await axios.get(`${BASE_URL}/categories/${subcategoryId}/lots`, {
                params: {customerId}
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching lots by subcategory and customer:', error);
            throw new Error('Failed to fetch lots by subcategory and customer');
        }
    }
}

export default new LotsServices();
