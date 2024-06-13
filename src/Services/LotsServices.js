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
            throw new Error('Erreur, nous ne pouvons pas afficher tous les lots actuellement. Veuillez réessayer plus tard');
        }
    }

    async getLotById(lotId) {
        try {
            const encodedId = this.encodeId(lotId);
            const response = await axios.get(`${BASE_URL}/${encodedId}`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur, nous ne pouvons par récuperer le lot. Veuillez réessayer plus tard');
        }
    }

    async getLotsBySubcategory(subcategoryId) {
        try {
            const response = await axios.get(`${BASE_URL}/categories/${subcategoryId}/lots`);
            return response.data;
        } catch (error) {
            throw new Error('Erreur, nous ne pouvons pas afficher les lots de cette sous-catégorie, veuillez réessayer plus tard ou avec une autre catégorie');
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
            throw new Error('Le lot n\'a pas pu être ajouté, veuillez essayer plus tard');
        }
    }

    async deleteLot(lotId) {
        try {
            const encodedId = this.encodeId(lotId);
            await axios.delete(`${BASE_URL}/${encodedId}`);
        } catch (error) {
            throw new Error('Le lot n\'a pas pu être supprimé, veuillez essayer plus tard');
        }
    }

    async endAuction(lotId) {
        try {
            const encodedId = this.encodeId(lotId);
            const response = await axios.put(`${BASE_URL}/${encodedId}/endAuction`);
            return response.data;
        } catch (error) {
            throw new Error('L\'enchère n\'a pas pu être terminé');
        }
    }

    async setLotActive(lotId, active) {
        try {
            const encodedId = this.encodeId(lotId);
            const response = await axios.put(`${BASE_URL}/${encodedId}/setActive`, null, {
                params: { active }
            });
            return response.data;
        } catch (error) {
            throw new Error('Vous n\'avez pas pu modifier l\'état du lot, veuillez réessayer plus tard');
        }
    }

    async getLotsByCustomer(customer) {
        try {
            const response = await axios.get(`${BASE_URL}/customer/${customer.id}`);
            return response.data;
        } catch (error) {
            throw new Error('Nous n\'avons pas réussi à afficher vos lots, veuillez réessayer plus tard');
        }
    }
}

export default new LotsServices();
