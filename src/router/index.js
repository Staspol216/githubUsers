import {createRouter, createWebHistory} from 'vue-router';
import UserList from '@/views/UserList';
import UserDetail from '@/views/UserDetail';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'UserList',
            component: UserList
        },
        {
            path: '/users/:login',
            name: 'UserDetail',
            component: UserDetail
        }
    ]
});

export default router;