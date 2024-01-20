<script setup lang="ts">
import {ref} from 'vue'
import {useUserStore} from "~/store";

const test = useUserStore()

const clipped = ref(false)
const drawer = ref(true)
const fixed = ref(false)
const items = ref([
  {
    icon: 'mdi-home-outline',
    title: 'Naslovnica',
    to: '/admin'
  },
  {
    icon: 'mdi-apps',
    title: 'Primjer tablice',
    to: '/admin/tablica'
  },
  {
    icon: 'mdi-account-multiple-outline',
    title: 'Korisnici',
    to: '/admin/korisnici'
  }
])

onBeforeMount(() => {
  getUser()
})
const user = ref()
async function getUser() {
  await test.setUser()
  user.value = test.getUser
}

</script>

<template>
  <v-navigation-drawer
      v-model="drawer"
      fixed
      app
  >
    <v-container>
      <v-row align="center" justify="center">
        <v-col class="text-center my-6">
          <v-img contain height="90" src="/img/sumit-logo.svg"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-list shaped>

      <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          class="!tw-rounded-br-full !tw-rounded-tr-full"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar
      fixed
      app
      color="sum-blue"
      dark
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
    <v-toolbar-title>Nuxt i Vuetify radionica</v-toolbar-title>
    <v-spacer/>
    <v-btn
        to="/"
        outlined
        rounded
        class="text-none"
    >
      <v-icon left small>mdi-logout</v-icon>
      Odjava
    </v-btn>
  </v-app-bar>
  <v-main>
    <v-container>
      <slot/>
    </v-container>
  </v-main>

  <v-footer
      :absolute="!fixed"
      :app="true"
      inset
  >
    <span>&copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<style scoped>

</style>