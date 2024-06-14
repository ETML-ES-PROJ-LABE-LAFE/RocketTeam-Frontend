// store/index.js

import { createStore } from 'vuex';
import notifications from './modules/notifications';
import customers from './modules/customers';

const store = createStore({
    modules: {
        notifications,
        customers,
    }
});

export default store;
