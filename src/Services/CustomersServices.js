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
            console.error('Failed to fetch customers', error);
            throw error;
        }
    }

    getSelectedCustomer() {
        const customer = JSON.parse(localStorage.getItem('selectedCustomer'));
        if (customer) {
            customer.balance = Number(customer.balance);
            customer.reservedBalance = Number(customer.reservedBalance);
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
            console.error('Failed to update customer balance', error);
            throw error;
        }
    }
}

export default new CustomersServices();
