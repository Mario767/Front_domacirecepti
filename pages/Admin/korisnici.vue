<template>
  <v-row>
    <div class="form-group">
      <v-row>
        <v-text-field v-model="korisnickoIme" label="Korisničko ime" required></v-text-field>
        <v-btn @click="pretraziKorisnika">Pretraži</v-btn>
      </v-row>
      <v-combobox label="Vrsta korisnika" v-model="vrstaKorisnika" :items="['Admin', 'Korisnik']" required @change="fetchKorisnici"></v-combobox>
    </div>
  </v-row>

  <v-data-table :headers="headers" :items="korisnici" class="elevation-1" :loading="loading">
    <template v-slot:item.action="{ item }">
      <v-btn @click="goToRecepti(item)">Recepti</v-btn>
      <template v-if="vrstaKorisnika !== 'Admin'">
        <v-btn color="primary" @click="promoviraj(item.Id)">Promote</v-btn>
        <v-btn color="error" @click="izbrisi(item.Id)">Izbriši</v-btn>
      </template>
    </template>
  </v-data-table>

  <div class="pagination">
    <button class="pagination-button" v-if="page > 1" @click="fetchKorisnici(page - 1)">Previous</button>
    <button class="pagination-button" v-if="nextPageAvailable" @click="fetchKorisnici(page + 1)">Next</button>
  </div>
</template>

<script>
import axios from 'axios';
import accountStore from '@/composables/accountStore'; 
definePageMeta
    ({
    layout
      : 'admin'
      })
      
export default {
  data() {
    return {
      vrstaKorisnika: '',
      korisnici: [],
      korisnickoIme: '',
      headers: [
        { text: 'Id', value: 'Id' },
        { text: 'Ime', value: 'Ime' },
        { text: 'Datum', value: 'Datum' },
        { text: 'Akcija', value: 'action', sortable: false },
      ],
      loading: false,
      page: 1,
      nextPageAvailable: false,
    };
  },
  watch: {
    vrstaKorisnika() {
      this.page = 1; // Resetiranje stranice kada se promijeni vrsta korisnika
      this.fetchKorisnici();
    },
  },
  methods: {
    goToRecepti(korisnik) {
      this.$router.push({ path: `/admin/recepti` });
      accountStore.actions.setKorinsikId(korisnik.Id);
    },
    async izbrisi(idKorisnika) {
  try {
    const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const response = await axios.post('http://127.0.0.1:8000/api/delkorisnik', { korisnik_id: idKorisnika }, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log(response.data);
    // Ažurirajte podatke ili prikažite poruku o uspjehu
    this.fetchKorisnici(); // Osvježite podatke
  } catch (error) {
    console.error(error);
    // Prikazati poruku o grešci ili izvršiti dodatne radnje
  }
},
async promoviraj(idKorisnika) {
  try {
    const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    const response = await axios.post('http://127.0.0.1:8000/api/adminuloge', { korisnik_id: idKorisnika }, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log(response.data);
    // Ažurirajte podatke ili prikažite poruku o uspjehu
    this.fetchKorisnici(); // Osvježite podatke
  } catch (error) {
    console.error(error);
    // Prikazati poruku o grešci ili izvršiti dodatne radnje
  }
},

    async fetchKorisnici(page) {
      this.loading = true;
      this.page = Number(page); // Pretvorite page u broj

      // Ako page nije broj (NaN), postavite ga na 1
      if (isNaN(this.page)) {
        this.page = 1;
      }

      const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      let url = '';
      
      if (this.vrstaKorisnika === 'Admin') {
        url = 'http://localhost:8000/api/korisniciadmin';
      } else {
        url = 'http://localhost:8000/api/korisnici';
      }

      try {
        const response = await axios.get(url, {
          params: { page: this.page },
          headers: { Authorization: `Bearer ${authToken}` },
        });
        this.korisnici = response.data.data;
        this.nextPageAvailable = response.data.next_page_url !== null;
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    async pretraziKorisnika() {
      this.page = 1;
      await this.fetchKorisnici();
    },
  },
  created() {
    // Dohvat podataka prilikom inicijalizacije
    this.fetchKorisnici();
  },
};
</script>

<style>
.form-group {
 margin-bottom: 1rem;
 margin-left: 5rem;
 margin-right: 5rem;
 margin-top: 2rem;
 width: 38rem;
}

.pagination {
  display: flex;
  justify-content: center;
}

.pagination-button {
  margin-top: 11px;
  margin-left: 11px;
  color: white;
  background-color: #FF6347;
  border: none;
  padding: 0.7rem;
  border-radius: 10%;
}
</style>
