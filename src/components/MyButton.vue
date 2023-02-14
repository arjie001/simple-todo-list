<script setup>
defineProps({
    type: {
        type: String,
        default: 'button',
    },
});
</script>

<template>
    <button :type="type" class="bg-blue-500 hover:bg-blue-600 focus:outline-none rounded-md px-6 py-2 text-white font-semibold shadow disabled:opacity-50">
        <slot />
    </button>
</template>
