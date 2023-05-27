<template>
  <div class="card">
    {{ userName }}
  </div>
</template>
<script>

export default {
    props: {
        userName: {
            type: String,
            required: true
        }
    }
};

</script>

<style lang="scss" scoped>

.card {
    background-color: var(--secondary);
    border-radius: 12px;
    border: 1px solid var(--primary);
    color: var(--primary);
    width: 300px;
    height: 60px;
}

</style>