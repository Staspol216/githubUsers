<template>
  <div class="wrapper">
    <UserDetailCard 
      :login="userDetails?.login"
      :name="userDetails?.name"
      :bio="userDetails?.bio"
      :followers="userDetails?.followers"
      :repos="userDetails?.public_repos"
      :gists="userDetails?.public_gists"
      :avatarUrl="userDetails?.avatar_url"
      :ghLink="userDetails?.html_url"
    />
  </div>
</template>

<script>
import UserDetailCard from '@/components/UserDetailCard';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
export default {
    name: 'UserDetail',
    components: {
        UserDetailCard
    },
    computed: {
        ...mapState('users', [
            'userDetails',
            'errorDetails'
        ]),
    },
    beforeUnmount() {
        this.setUserDetailsData(null);
    },
    created() {
        this.loadUserDetails(this.$route.params.login);
    },
    methods: {
        ...mapActions('users',[
            'loadUserDetails',
        ]),
        ...mapMutations('users', [
            'setSearchQuery',
            'setUserDetailsData'
        ]),
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    justify-content: center;
    padding-top: 60px;
}
</style>