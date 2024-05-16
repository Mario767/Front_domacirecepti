<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const drawer = ref(false);
const isMobile = ref(false);

// Stanje za praćenje otvorenosti/zatvorenosti Navigacijskog Drawera
const links = [
  { ime: 'Domaci recepti', ruta: '/', icon: 'mdi-home' },
  { ime: 'Predjela', ruta: '/predjela', icon: 'mdi-food-apple' },
  { ime: 'Glavna jela', ruta: '/glavnajela', icon: 'mdi-food-steak' },
  { ime: 'Deserti', ruta: '/deserti', icon: 'mdi-food-croissant' },
];

// Računata osobina za ikonu Drawera
const drawerIcon = computed(() => (drawer.value ? 'mdi-chevron-left' : 'mdi-menu'));

// Metoda koja ažurira stanje isMobile prema veličini ekrana
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 1024;
};

// Pozovi updateIsMobile kad se komponenta montira
onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});

// Makni event listener kad se komponenta uništi
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile);
});

// Metoda za zatvaranje navigacijskog drawera kad je veličina ekrana veća od tableta
const closeDrawerOnLargeScreen = () => {
  if (!isMobile.value) {
    drawer.value = false;
  }
};

import accountStore from '@/composables/accountStore'; // Prilagodite putanju prema vašem stvarnom položaju

const redirectToProfile = () => {
  accountStore.actions.login();
};
</script>

<template>

    <v-app-bar fixed app height="80" color="#C87C36">
      <div style="display: flex; align-items: center;">
        <img v-if="!isMobile" class="tw-max-h-[80px] ml-16" src="/img/icon-hat.svg" />
        <v-spacer class="mb-2" />
        <nuxt-link v-if="!isMobile" to="/" class="dm">Domaci recepti</nuxt-link>
      </div>
      <v-spacer class="mb-8" />
      <div class="lv">
        <nuxt-link v-if="!isMobile" to="/predjela" class="t1">Predjela</nuxt-link>
        <nuxt-link v-if="!isMobile" to="/glavnajela" class="t1">Glavna jela</nuxt-link>
        <nuxt-link v-if="!isMobile" to="/deserti" class="t1">Deserti</nuxt-link>
      </div>
      <v-spacer />
      <div class="vl" style="display: flex; align-items: center;">
        <nuxt-link to="/search"><img class="sl"  src="/img/search-icon.svg"></nuxt-link>
        <div>
   
      <img class="mr" src="/img/profile.svg" @click="redirectToProfile" />
   
    
</div>

      </div>
      <v-btn v-if="isMobile" icon @click.stop="drawer = !drawer">
        <v-icon>{{ drawerIcon }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary @click="closeDrawerOnLargeScreen">
      <v-list>
        <v-list-item v-for="(link, index) in links" :key="index" :to="link.ruta" link>
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.ime }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-sheet min-height="100vh" rounded="lg">
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

</template>

<style scoped>
.t1 {
  color: #FFF;
  font-family: 'Ink Free', sans-serif;
  font-size: 22px;
  font-style: normal;
  line-height: normal;
  margin-left: 20px;
}
.dm {
  color: #FFF;
  font-family: 'Ink Free', sans-serif;
  font-size: 30px;
  font-style: normal;
  line-height: normal;
  margin-left: 20px;
}
.sl {
  width: 3rem;
  height: 3rem;
}
.lv {
  margin-left: 10rem;
}
.vl {
  margin-right: 2rem;
}
.mr {
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
}
</style>