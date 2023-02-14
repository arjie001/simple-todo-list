<script setup>
import { ref, provide } from 'vue'
import useLocalStorage from '@/useLocalStorage'

const default_items = {
  pending: [],
  done: []
};
const local_items = useLocalStorage('items', default_items);

provide('local_items', local_items);
</script>

<template>
  <router-view />
</template>
