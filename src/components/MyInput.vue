<script setup>
import { onMounted, ref } from "vue";

defineProps({
    modelValue: String,
});

defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <input
        ref="input"
        class="shadow appearance-none border-2 border-blue-500 focus:border-indigo-300 rounded-md py-2 px-3 text-grey-darker"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
