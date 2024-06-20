import axios from 'axios';

const BASE_URL = "http://localhost:8080/customers";

class CustomersServices {
    async getAllCustomers() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data.map(customer => ({
                ...customer,
                balance: Number(customer.balance),
                reservedBalance: Number(customer.reservedBalance)
            }));
        } catch (error) {
            throw new Error('Erreur lors du chargement des clients, veuillez essayer plus tard');
        }
    }

    getSelectedCustomer() {
        const customer = JSON.parse(localStorage.getItem('selectedCustomer'));
        if (customer) {
            customer.balance = Number(customer.balance);
            customer.reservedBalance = Number(customer.reservedBalance);
            customer.originalBalance = Number(customer.originalBalance || customer.balance); // Initialiser originalBalance si nécessaire
        }
        return customer;
    }

    setSelectedCustomer(customer) {
        localStorage.setItem('selectedCustomer', JSON.stringify(customer));
    }

    async updateCustomerBalance(customer) {
        try {
            await axios.put(`${BASE_URL}/${customer.id}`, customer);
        } catch (error) {
            throw new Error('Failed to update customer balance');
        }
    }
}

export default new CustomersServices();
