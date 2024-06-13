import axios from 'axios';

const BASE_URL = "http://localhost:8080/encheres";

class EnchereService {
    async placeEnchere(enchere) {
        try {
            const response = await axios.post(BASE_URL, enchere);
            return response.data;
        } catch (error) {
            throw new Error('Erreur vous empêchant de placer une enchère, veuillez réessayer plus tard');
        }
    }
}

export default new EnchereService();
