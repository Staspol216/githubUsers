<template>
  <div class="user-detail-card">
    <a
      :href="ghLink"
      target="_blank"
      class="head "
    >
      <BaseAvatar
        :src="avatarUrl"
        :size="200"
      />
    </a>
    <div class="body">
      <div class="login">
        {{ login }}
      </div>
      <div class="name">
        {{ name }}
      </div>
      <div class="bio">
        {{ bio }}
      </div>
      <div class="stats">
        <div class="stat-item">
          <div class="stat-item-icon">
            Followers
          </div>
          <div class="stat-item-text">
            {{ followers }}
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-item-icon">
            Repos
          </div>
          <div class="stat-item-text">
            {{ repos }}
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-item-icon">
            Gists
          </div>
          <div class="stat-item-text">
            {{ gists }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseAvatar from '@/components/BaseAvatar';
export default {
    components: {
        BaseAvatar
    },
    props: {
        login: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        bio: {
            type: String,
            default: ''
        },
        followers: {
            type: [String, Number],
            default: 0
        },
        repos: {
            type: [String, Number],
            default: 0
        },
        gists: {
            type: [String, Number],
            default: 0
        },
        avatarUrl: {
            type: String,
            default: ''
        },
        ghLink: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.user-detail-card {
    border: 1px solid var(--primary);
    border-radius: 12px;
    width: 340px;
    padding: 40px;
    height: 500px;
}
.head {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
}
.body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.login {
    font: var(--font-l);
    margin-bottom: 4px;
}
.name {
    margin-bottom: 8px;
}
.bio {
    display: -webkit-box;
    overflow: hidden;
    text-align: center;
    margin-bottom: 16px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.stats {
    display: flex;
    justify-content: space-around;
    width: 100%;
}
.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>