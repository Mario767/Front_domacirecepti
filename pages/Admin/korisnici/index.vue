<script setup lang="ts">
import {ref, onBeforeMount} from 'vue'

definePageMeta({
  layout: 'admin'
})

const breadcrumbs = ref([
  {
    title: 'Naslovnica',
    disabled: false,
    href: '/admin',
  },
  {
    title: 'Korisnici',
    disabled: true,
    href: '/korisnici',
  },
])
const users = ref()
const loading = ref(false)


onBeforeMount(async () => {
  await nextTick()
  await getUsers()
})
async function getUsers () {
  loading.value = true
  try {
    const response = await useFetch('https://reqres.in/api/users')
    users.value = response.data.value
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  loading.value = false
}
</script>

<template>
  <div>
    <v-row>
      <v-col>
        <div class="primary--text text-h5">Korisnici</div>
        <v-breadcrumbs class="ml-0 pl-0" :items="breadcrumbs" large></v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-progress-linear v-if="loading"></v-progress-linear>
      </v-col>
      <v-col v-if="users" cols="12" md="4" v-for="(user, i) in users.data" :key="i">
        <CardUsers :user="user" />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

</style>