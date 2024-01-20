<script setup >
import {ref, onMounted} from 'vue'

const technologies = ref([
  {
    id: 1,
    title: 'Vue JS',
    subtitle: 'JavaScript Framework',
    text: 'Vue.js se smatra da je jedan od najjednostavnijih JavaScript framework-a, koji je veoma brz, ima malu veličinu i veoma detaljnu dokumentaciju. Vue.js je veoma fleksibilan i prilagodljiv različitim vrstama projekata.',
    link: 'https://vuejs.org/',
    color: '#42b883',
    image: '/img/vue.jpg'
  },
  {
    id: 2,
    title: 'Vuetify',
    subtitle: 'Material Design UI biblioteka',
    text: 'Vuetify je Vue UI biblioteka s prekrasno ručno izrađenim materijalnim komponentama. Nisu potrebne dizajnerske vještine — sve što vam je potrebno za stvaranje nevjerojatnih aplikacija na dohvat vam je ruke.',
    link: 'https://vuetifyjs.com/en/',
    color: '#2196F3',
    image: '/img/vuetify.jpg'
  },
  {
    id: 3,
    title: 'Nuxt JS',
    subtitle: 'Vue JS Framework',
    text: 'S pouzdanjem izradite svoju sljedeću Vue.js aplikaciju koristeći Nuxt. Okvir otvorenog koda koji web razvoj čini jednostavnim i moćnim.',
    link: 'https://nuxtjs.org/',
    color: '#35495e',
    image: '/img/nuxt.jpg'
  },
  {
    id: 4,
    title: 'Tailwind',
    subtitle: 'Tailwind CSS Framework',
    text: 'Tailwind CSS je alat za brzo i jednostavno stvaranje modernih i atraktivnih web stranica. To je post-processor CSS biblioteka koja omogućuje razvijateljima da brzo i jednostavno kreiraju profesionalne i atraktivne web stranice bez potrebe za ručnim pisanjem CSS koda.',
    link: 'https://tailwindcss.com/',
    color: '#007bff',
    image: '/img/tailwind.jpg'
  },
])
</script>

<template>
  <div>
    <v-container :fluid="true" class="pa-0">
      <v-img max-height="600" :cover="true" src="/img/cover-photo.png">
        <v-container style="height: 100%">
          <v-row align="center" justify="center" style="height: 100%">
            <v-col class="text-center">
              <v-img contain height="90" src="/img/sumit-white.svg"></v-img>
              <div class="text-h4 tw-text-white font-weight-bold">Dobrodošli na Radionicu SUMIT-a!</div>
            </v-col>
          </v-row>
        </v-container>
      </v-img>

      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="text-h4 text-sum-blue">Što smo naučili na radionici?</div>
          </v-col>

          <v-col cols="12" v-for="(item, i) in technologies" :key="i">
            <HomePageCard :test="item"/>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

  </div>
</template>

<style scoped>

</style>