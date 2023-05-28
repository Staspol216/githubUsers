<template>
  <div
    class="input-wrapper"
    :style="{width}"
  >
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput" 
    >
  </div>
</template>

<script>
export default {
    name: 'BaseInput',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            required: true
        },
    	width: {
            type: String,
            default: 'auto'
        }
    },
    emits: ['update:modelValue'],
    methods: {
        handleInput(val) {
            this.$emit('update:modelValue', val);
        }
    },
};
</script>

<style lang="scss" scoped>
.input {
	border: 1px solid var(--primary);
	outline: none;
	background: #fafafa;
	padding: 0 10px;
	height: 40px;
	border-radius: 7px;
	width: 100%;
}
</style>