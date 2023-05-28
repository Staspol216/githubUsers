<template>
  <select
    class="select"
    :value="modelValue"
    @change="handleChange"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: String,
            required: true
        }
    },
    emits: ['update:modelValue'],
    methods: {
        handleChange(e) {
            this.$emit('update:modelValue', e.target.value);
        }
    }
};
</script>

<style lang="scss" scoped>
.select {
    border: 1px solid var(--primary);
    color: var(--primary);
    outline: none;
    background: #fafafa;
    padding: 0 20px 0 0;
    height: 40px;
    padding: 0 10px;
    border-radius: 7px;
}
</style>