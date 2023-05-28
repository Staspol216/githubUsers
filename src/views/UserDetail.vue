<template>
  <div>
    dasdadassd
    {{ user?.company }}
    {{ user?.login }}
    {{ user?.name }}
    {{ user?.public_gists }}
    {{ user?.public_repos }}
    {{ user?.followers }}
    {{ user?.bio }}
    {{ user?.avatar_url }}
    {{ user?.html_url }}
  </div>
</template>

<script>
import { userService } from '@/services/modules/userService';
export default {
    name: 'UserDetail',
    data() {
        return {
            user: null
        };
    },
    created() {
        this.loadUserDetails();
    },
    methods: {
        async loadUserDetails() {
            const [ error, { data } ] = await userService.getUserDetails(this.$route.params.login);
            if (error) return;
            this.user = data;
            console.log(this.user);
        }
    },
};
</script>

<style lang="scss" scoped>

</style>