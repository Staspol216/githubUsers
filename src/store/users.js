import { userService } from '@/services/modules/userService';


export const users = {
    namespaced: true,
    state: () => ({
        users: null,
        error: '',
        totalCount: null
    }),
    getters: {
        getUserById: (state) => (id) => {
            return state.users.find((user) => user.id.toString() === id);
        }
    },
    mutations: {
        SET_ERROR(state, error) {
            state.error = error;
        },
        SET_USERS(state, users) {
            state.users = users;
        },
        SET_TOTAL_COUNT(state, count) {
            state.totalCount = count;
        }
    },
    actions: {
        async loadUsers({ commit }, payload) {

            const [ error, { data: { items: users, total_count }} ] = await userService.getUsers(payload);

            if (error) {
                commit('SET_ERROR', error);
                return;
            }
            console.log(users);
            console.log(total_count);

            commit('SET_USERS', users);
            commit('SET_TOTAL_COUNT', total_count);
        },
    },
};
