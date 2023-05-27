<template>
  <div>
    <BaseInput
      type="text"
      placeholder="Github username"
      :modelValue="search"
      @update:modelValue="debouncedInput"
    />
    <div class="list">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :userName="user.login"
        :avatarUrl="user.avatar_url"
        :profileLink="user.url"
      />
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput';
import UserCard from '@/components/UserCard.vue';
import { mapActions, mapState } from 'vuex';
import { debounce } from 'lodash';
export default {
    name: 'UserList',
    components: {
        BaseInput,
        UserCard,
    },
    data() {
        return {
            search: '',
            debouncedInput: null
        };
    },
    computed: {
        ...mapState('users', [
            'users'
        ]),
    },
    created() {
        this.debouncedInput = debounce((e) => {
            const value = e.target.value;
            this.search = value;
            if (value !== '') this.getUsers(value);
        }, 500);
    },
    beforeUnmount() {
        this.debouncedInput.cancel();
    },
    methods: {
        ...mapActions('users',[
            'getUsers',
        ]),
    },
};
</script>

<style lang="scss" scoped>
.list {
    padding: 0 12px;
}
</style>