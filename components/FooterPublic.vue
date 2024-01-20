<script setup lang="ts">
import {ref} from 'vue'

const icons = ref( [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
  'mdi-instagram',
])
</script>

<template>
  <v-footer
      color="#C87C36"
  >
    <div>
      <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 "
          :icon="icon"
          variant="text"
      ></v-btn>
    </div>



    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>
</template>

<style scoped>

</style>