import { createStore } from 'vuex';
import notifications from './modules/notifications';

const store = createStore({
    modules: {
        notifications
    }
});

export default store;
