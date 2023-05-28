<template>
  <div class="label">
    {{ label }}
  </div>
  <BaseSelect
    :modelValue="modelValue"
    :options="sortOptions"
    @update:modelValue="handleChange"
  />
</template>

<script>
import BaseSelect from '../BaseSelect.vue';
import { sortOptions } from './model.js';

export default {
    components: { BaseSelect },
    props: {
        label: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            sortOptions
        };
    },
    methods: {
        handleChange(val) {
            this.$emit('update:modelValue', val);
        }
    },
};
</script>

<style lang="scss" scoped>
.label {
    margin-bottom: 4px;
}
</style>