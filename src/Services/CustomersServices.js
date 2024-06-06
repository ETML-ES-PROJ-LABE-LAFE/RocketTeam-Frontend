import axios from 'axios';

const BASE_URL = "http://localhost:8080/customers";

class CustomersServices {
    async getAllCustomers() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching customers:', error);
            throw new Error('Failed to fetch customers');
        }
    }

    getSelectedCustomer() {
        const customer = localStorage.getItem('selectedCustomer');
        return customer ? JSON.parse(customer) : null;
    }

    setSelectedCustomer(customer) {
        localStorage.setItem('selectedCustomer', JSON.stringify(customer));
    }

}

export default new CustomersServices();
