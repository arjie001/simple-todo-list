<script setup>
import { ref, provide } from 'vue'
import useLocalStorage from '@/useLocalStorage'

const default_items = {
  pending: [],
  done: []
};

//get storage data or return default value
const local_items = useLocalStorage('items', default_items);

//provide to pass data to children components
provide('local_items', local_items);
</script>

<template>
  <router-view />
</template>
