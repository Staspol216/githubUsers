
import UserList from './UserList';
import { shallowMount, mount } from '@vue/test-utils';
import store from '@/store';


test('error in user list serach', () => {
    const wrapper = shallowMount(UserList, {
        global: {
            plugins: [store]
        },
        data() {
            return {
                minLengthError: true
            };
        }  
    });
    expect(wrapper.find('.error').text()).toBe('Please, enter more than 2 characters');
});