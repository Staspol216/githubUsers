
import SortSelect from './SortSelect';
import { shallowMount, mount } from '@vue/test-utils';

test('has element with label', () => {
    const wrapper = shallowMount(SortSelect, {
        props: {
            label: 'Label'
        }
    });
    expect(wrapper.find('.label').text()).toBe('Label');
});

test('modelValue should be updated', async () => {
    const wrapper = mount(SortSelect, {
        props: {
            modelValue: 'desc',
            'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
        }
    });
    await wrapper.find('select').setValue('asc');
    expect(wrapper.props('modelValue')).toBe('asc');
});