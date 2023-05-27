import { userService } from '@/services/modules/userService';


export const users = {
    namespaced: true,
    state: () => ({
        users: [],
        error: '',
    }),
    getters: {
        getUsers(state) {
            return state.users;
        },
    },
    mutations: {
        SET_ERROR(state, error) {
            state.error = error;
        },
        SET_USERS(state, users) {
            state.users = users;
        }
    },
    actions: {
        async getUsers({ commit }, payload) {

            const [ error, { items: users } ] = await userService.getUsers(payload);

            if (error) {
                commit('SET_ERROR', error);
                return;
            }

            commit('SET_USERS', users);
        },
    },
};
