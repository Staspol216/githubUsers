import {createRouter, createWebHistory} from 'vue-router';
import UserList from '@/views/UserList';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'UserList',
            component: UserList
        },
    ]
});

export default router;