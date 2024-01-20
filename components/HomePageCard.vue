<script setup lang="ts">
import {ref} from 'vue'

const props = defineProps({
  test: {
    item: Object,
    required: true,
  },
})
const item = ref(props.test)
</script>

<template>
  <v-card class="!tw-border-2 !tw-border-opacity-10 !tw-rounded-lg" elevation="0">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div class="text-h5 primary--text font-weight-bold">{{item.title}}</div>
          <div class="mt-4 text-h6" :style="`color: ${item.color}`">{{item.subtitle}}</div>
          <div class="mt-2 grey--text">{{item.text}}</div>
          <v-btn :href="item.link" target="_blank" class="text-none mt-4" color="sum-blue"><v-icon left small>mdi-open-in-new</v-icon>Pročitaj više</v-btn>
        </v-col>
        <v-col cols="12" md="6" class="tw-flex tw-justify-end">
          <img style="max-width: 400px" :src="item.image">
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style scoped>

</style>