<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'

definePageMeta({
  layout: 'admin'
})

const search = ref()
const breadcrumbs = ref([
  {
    title: 'Naslovnica',
    disabled: false,
    href: '/admin',
  },
  {
    title: 'Testna tablica',
    disabled: true,
    href: '/tablica',
  },
])
const headers = ref([
  {
    title: 'Ime',
    align: 'start',
    sortable: false,
    value: 'first_name',
  },
  { title: 'Prezime', value: 'last_name' },
  { title: 'Email', value: 'email' },
  { title: 'Korisnička fotografija', value: 'avatar' },
  { title: 'Akcije', value: 'actions' },
])
const items = ref()

const items_test = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%',
  },
])

const loading = ref(false)

onBeforeMount(async () => {
  await nextTick()
  await getUsers()
})
async function getUsers () {
  loading.value = true
  try {
    const response = await useFetch('https://reqres.in/api/users')
    items.value = response.data.value
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  loading.value = false
}
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="9">
      <div class="text-sum-blue text-h5">Testna tablica</div>
      <v-breadcrumbs class="ml-0 pl-0" :items="breadcrumbs" large></v-breadcrumbs>
    </v-col>
    <v-col cols="12" md="3">
      <v-text-field variant="outlined" dense hide-details label="Pretraga" rounded prepend-inner-icon="mdi-magnify" v-model="search"></v-text-field>
    </v-col>
    <v-col cols="12" v-if="items">
      <v-data-table
          :search="search"
          :headers="headers"
          :items="items.data"
          class="elevation-1"
      >
        <template v-slot:item.avatar="{ item }">
          <v-avatar size="40">
            <v-img :src="item.avatar"></v-img>
          </v-avatar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              size="small"
              class="me-2"
          >
            mdi-pencil
          </v-icon>
          <v-icon
              size="small"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>