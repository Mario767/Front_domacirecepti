<script setup lang="ts">
import {ref} from 'vue'
const props = defineProps({
  user: {
    item: Object,
    required: true,
  },
});
const user = ref(props.user)
</script>

<template>
  <v-card
      class="mx-auto"
      max-width="344"
      outlined
  >
    <v-list-item >
      <v-list-item>
        <div class="text-overline mb-4">
          Kartica korisnika
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ user.first_name + ' ' + user.last_name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
      </v-list-item>
      <template v-slot:prepend>
        <v-avatar size="100" >
          <v-img v-if="user.avatar" :src="user.avatar"></v-img>
          <v-img v-else src="/img/nuxt.jpg"></v-img>
        </v-avatar>
      </template>
    </v-list-item>

    <v-card-actions>
      <v-btn
          variant="tonal"
          rounded
          class="text-none"
      >
        Pogledaj više
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>