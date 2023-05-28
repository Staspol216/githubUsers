<template>
  <img
    :src="src"
    :class="['avatar', className]"
    :style="{
      width: size + 'px',
      height: size + 'px'
    }"
    :alt="alt"
  >
</template>

<script>
export default {
    name: 'BaseAvatar',
    props: {
        src: {
            type: String,
            default: ''
        },
        size: {
            type: Number,
            default: 60,
        },
        alt: {
            type: String,
            default: ''
        },
        className: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.avatar {
    border-radius: 50%;
}
</style>