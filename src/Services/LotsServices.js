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

    async getLotById(lotId) {
        try {
            const response = await axios.get(`${BASE_URL}/${lotId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching lot by ID:', error);
            throw new Error('Failed to fetch lot by ID');
        }
    }

    async getLotsBySubcategory(subcategoryId) {
        try {
            const response = await axios.get(`${BASE_URL}/categories/${subcategoryId}/lots`);
            return response.data;
        } catch (error) {
            console.error('Error fetching lots by subcategory:', error);
            throw new Error('Failed to fetch lots by subcategory');
        }
    }

    async placeBid(lotId, bidAmount) {
        try {
            const response = await axios.put(`${BASE_URL}/${lotId}/placeBid`, null, {
                params: { bidAmount }
            });
            return response.data;
        } catch (error) {
            console.error('Error placing bid:', error);
            throw new Error('Failed to place bid');
        }
    }

    async removeLot(lotId) {
        try {
            await axios.delete(`${BASE_URL}/${lotId}/remove`);
        } catch (error) {
            console.error('Error removing lot:', error);
            throw new Error('Failed to remove lot');
        }
    }

    async addLot(lot) {
        try {
            const response = await axios.post(BASE_URL, lot);
            return response.data;
        } catch (error) {
            console.error('Error adding lot:', error);
            throw new Error('Failed to add lot');
        }
    }

    async deleteLot(lotId) {
        try {
            await axios.delete(`${BASE_URL}/${lotId}`);
        } catch (error) {
            console.error('Error deleting lot:', error);
            throw new Error('Failed to delete lot');
        }
    }

    async endAuction(lotId) {
        try {
            const response = await axios.put(`${BASE_URL}/${lotId}/endAuction`);
            return response.data;
        } catch (error) {
            console.error('Error ending auction:', error);
            throw new Error('Failed to end auction');
        }
    }

    async getLotsByCustomer(customerId) {
        try {
            const response = await axios.get(`${BASE_URL}/customer/${customerId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching lots by customer:', error);
            throw new Error('Failed to fetch lots by customer');
        }
    }
}

export default new LotsServices();
