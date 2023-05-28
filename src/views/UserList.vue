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
      v-if="totalPages && users?.length"
      v-model="page"
      :pageCount="totalPages"
      :pageRange="3"
      :marginPages="2"
      :clickHandler="debouncedPaginate"
      containerClass="pagination"
      pageClass="pagination-item"
    />
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput';
import BaseCard from '@/components/BaseCard';
import BaseAvatar from '@/components/BaseAvatar';
import { mapActions, mapState } from 'vuex';
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
            search: '',
            page: 1,
            per_page: 10,
            order: 'desc',
            debouncedInput: null,
            error: false,
        };
    },
    computed: {
        ...mapState('users', [
            'users',
            'totalCount'
        ]),
        totalPages() {
            const total = Math.ceil(this.totalCount / this.per_page);
            const apiLimit = 100;
            return total > apiLimit ? apiLimit : total;
        }
    },
    created() {
        this.debouncedInput = debounce((e) => {
            const searchQuery = e.target.value;
            this.error = false;
            this.search = searchQuery;
            if (searchQuery === '') return;
            if (searchQuery.length <= 2) {
                this.error = true;
                return;
            }
            this.loadUsers(this.getRequestPayload());
        }, 500);
        this.debouncedPaginate = debounce((page) => {
            this.page = page;
            this.loadUsers(this.getRequestPayload());
        }, 500);
    },
    beforeUnmount() {
        this.debouncedInput.cancel();
    },
    methods: {
        ...mapActions('users',[
            'loadUsers',
        ]),
        handleSortByRepo(order) {
            this.order = order;
            this.loadUsers(this.getRequestPayload());
        },
        getRequestPayload() {
            return {
                q: this.search,
                per_page: this.per_page,
                page: this.page,
                order:  this.order,
                sort: 'repositories',
            };
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