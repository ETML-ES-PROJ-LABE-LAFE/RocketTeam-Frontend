// store/modules/customers.js

import CustomersServices from '@/Services/CustomersServices.js';

const state = {
    customer: null,
};

const getters = {
    balance: (state) => {
        return state.customer ? state.customer.balance - state.customer.reservedBalance : 0;
    },
};

const mutations = {
    setCustomer(state, customer) {
        state.customer = customer;
    },
    updateBalance(state, balance) {
        if (state.customer) {
            state.customer.balance = balance;
        }
    },
    updateReservedBalance(state, reservedBalance) {
        if (state.customer) {
            state.customer.reservedBalance = reservedBalance;
        }
    },
};

const actions = {
    async fetchCustomers({ commit }) {
        const customers = await CustomersServices.getAllCustomers();
        commit('setCustomers', customers);
    },
    updateCustomerBalance({ commit }, balance) {
        commit('updateBalance', balance);
    },
    setSelectedCustomer({ commit }, customer) {
        commit('setCustomer', customer);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
