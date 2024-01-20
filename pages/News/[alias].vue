<script setup lang="ts">
import {ref} from 'vue'

const route = ref(useRoute());
</script>

<template>
  <h1>{{ route.params.alias }}</h1>
</template>

<style scoped>

</style>