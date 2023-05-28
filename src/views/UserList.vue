<template>
  <div class="users-page">
    <div class="search-input">
      <BaseInput
        type="text"
        placeholder="Github username"
        :modelValue="search"
        :error="error"
        @update:modelValue="debouncedInput"
      />
      <div
        v-if="error"
        class="error"
      >
        Please, enter more than 2 characters
      </div>
    </div>
    <div
      v-show="search.length > 2"
      class="repositories-sort"
    >
      <SortSelect
        v-if="users?.length"
        :modelValue="order"
        label="Количество репозиториев"
        @update:modelValue="handleSortByRepo"
      />
    </div>
    <div
      v-if="users?.length"
      v-show="search.length > 2"
      class="list"
    >
      <BaseCard
        v-for="user in users"
        :id="user.id"
        :key="user.id"
        :title="user.login"
        :link="user.html_url"
        :route="`users/${user.login}`"
      >
        <template #avatar>
          <BaseAvatar
            :size="40"
            :src="user.avatar_url"
            alt="user"
          />
        </template>
      </BaseCard>
    </div>
    <div v-if="users?.length === 0">
      No results
    </div>
    <BasePagination 
      v-show="search.length > 2"
      v-if="getTotalPages && users?.length"
      :modelValue="page"
      :pageCount="getTotalPages"
      :pageRange="3"
      :marginPages="2"
      :clickHandler="debouncedPaginate"
      containerClass="pagination"
      pageClass="pagination-item"
      @update:modelValue="setPage"
    />
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput';
import BaseCard from '@/components/BaseCard';
import BaseAvatar from '@/components/BaseAvatar';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
import { debounce } from 'lodash';
import SortSelect from '@/components/SortSelect/SortSelect';
import BasePagination from '@/components/BasePagination';
export default {
    name: 'UserList',
    components: {
        BaseInput,
        BaseCard,
        BaseAvatar,
        SortSelect,
        BasePagination
    },
    data() {
        return {
            debouncedInput: null,
            debouncedPaginate: null,
        };
    },
    computed: {
        ...mapState('users', [
            'users',
            'totalCount',
            'search',
            'order',
            'page',
            'error'
        ]),
        ...mapGetters('users', [
            'getRequestPayload',
            'getTotalPages',
        ]),
    },
    created() {
        this.debouncedInput = debounce((e) => {
            this.handleSearch(e.target.value);
        }, 500);
        this.debouncedPaginate= debounce(() => {
            this.loadUsers(this.getRequestPayload);
        }, 500);
    },
    beforeUnmount() {
        this.debouncedInput.cancel();
    },
    methods: {
        ...mapActions('users',[
            'loadUsers',
        ]),
        ...mapMutations('users', [
            'setSearchQuery',
            'setListOrder', 
            'setPage',
            'setError'
        ]),
        handleSearch(query) {
            this.setError(false);
            this.setSearchQuery(query);
            if (query.length <= 2) {
                this.setError(true);
                return;
            }
            this.loadUsers(this.getRequestPayload);
        },
        handleSortByRepo(order) {
            this.setListOrder(order);
            this.loadUsers(this.getRequestPayload);
        },
    },
};
</script>

<style lang="scss" scoped>
.users-page {
  padding: 80px 12px;
}
.search-input {
  margin-bottom: 12px;
}
.repositories-sort {
  margin-bottom: 16px;
}
.list {
    display: flex;
    flex-direction: column;
	margin-bottom: 20px;
    gap: 12px;
}
.error {
	color: red;
	font-weight: 400;
}
</style>