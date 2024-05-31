import axios from 'axios';

const BASE_URL = "http://localhost:8080/lots";

class LotsServices {
    encodeId(id) {
        return btoa(id);
    }

    decodeId(encodedId) {
        return atob(encodedId);
    }

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
            const encodedId = this.encodeId(lotId);
            const response = await axios.get(`${BASE_URL}/${encodedId}`);
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

    async addLot(lot) {
        try {
            const response = await axios.post(BASE_URL, JSON.stringify(lot), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error adding lot:', error);
            throw new Error('Failed to add lot');
        }
    }

    async deleteLot(lotId) {
        try {
            const encodedId = this.encodeId(lotId);
            await axios.delete(`${BASE_URL}/${encodedId}`);
        } catch (error) {
            console.error('Error deleting lot:', error);
            throw new Error('Failed to delete lot');
        }
    }

    async endAuction(lotId) {
        try {
            const encodedId = this.encodeId(lotId);
            const response = await axios.put(`${BASE_URL}/${encodedId}/endAuction`);
            return response.data;
        } catch (error) {
            console.error('Error ending auction:', error);
            throw new Error('Failed to end auction');
        }
    }


    async getLotsByCustomer(customer) {
        try {
            const response = await axios.get(`${BASE_URL}/customer/${customer.id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching lots by customer:', error);
            throw new Error('Failed to fetch lots by customer');
        }
    }
}

export default new LotsServices();
