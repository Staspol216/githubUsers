<template>
  <div
    class="card"
    @click="$router.push(route)"
  >
    <div
      class="avatar-wrapper"
    >
      <slot name="avatar" />
    </div>
    <div class="card-body">
      <div
        class="name"
      >
        {{ title }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        id: {
            type: [Number, String],
            required: true,
        },
        link: {
            type: String,
            default: ''
        },
        route: {
            type: String,
            default: ''
        }
    }
};

</script>

<style lang="scss" scoped>
.card {
    display: flex;
    background-color: var(--secondary);
    border-radius: 12px;
    border: 1px solid var(--primary);
    color: var(--primary);
    width: 100%;
    height: 60px;
    padding: 8px;
    transition: transform 0.3s;
    cursor: pointer;
}

.card:hover {
  transform: scale(1.02);
}
.card-body {
	display: flex;
	align-items: center;
}
.avatar-wrapper {
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    margin-right: 12px;
}

.show-more-btn {
    outline: none;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
}

</style>