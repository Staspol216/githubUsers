import { userService } from '@/services/modules/userService';

const API_LIMIT = 100;

export const users = {
    namespaced: true,
    state: () => ({
        users: null,
        userDetails: null,
        error: '',
        minLengthError: '',
        errorDetails: '',
        totalCount: null,
        order: 'desc',
        page: 1,
        limit: 10,
    }),
    getters: {
        getTotalPages({ totalCount, limit }) {
            const total = Math.ceil(totalCount / limit);
            return total > API_LIMIT ? API_LIMIT : total;
        }
    },
    mutations: {
        setError(state, error) {
            state.error = error;
        },
        setErrorDetails(state, error) {
            state.errorDetails = error;
        },
        setUsers(state, users) {
            state.users = users;
        },
        setUserDetailsData(state, userDetails) {
            state.userDetails = userDetails;
        },
        setTotalCount(state, count) {
            state.totalCount = count;
        },
        setListOrder(state, order) {
            state.order = order;
        },
        setSearchQuery(state, query) {
            state.search = query;
        },
        setPage(state, page) {
            state.page = page;
        }
    },
    actions: {
        async loadUsers({ commit }, payload) {

            const [ error, { data: { items: users, total_count }} ] = await userService.getUsers(payload);

            if (error) {
                commit('setError', error);
                return;
            }

            commit('setUsers', users);
            commit('setTotalCount', total_count);
        },
        async loadUserDetails({ commit }, username) {
            const [ error, { data } ] = await userService.getUserDetails(username);

            if (error) {
                commit('setErrorDetails', error);
            }

            commit('setUserDetailsData', data);
        }
    },
};
