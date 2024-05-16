<template>
  <div id="app">
    <h2>Dodaj novi recept</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="naziv_recepta">Naziv recepta:</label>
        <input type="text" id="naziv_recepta" v-model="nazivRecepta" maxlength="60" required>
      </div>
      <div class="form-group">
        <label for="opis">Opis:</label>
        <textarea id="opis" v-model="opis" maxlength="1000" required></textarea>
      </div>
      <div class="form-group">
        <label for="slika">Slika:</label>
        <input type="file" id="slika" @change="handleFileUpload" accept="image/*">
      </div>
      <div class="form-group">
        <v-combobox
          label="Vrsta jela"
          v-model="vrstaJela"
          :items="['Glavno jelo', 'Predjelo', 'Desert']"
          required
        ></v-combobox>
      </div>
      <button type="submit">Spremi recept</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import accountStore from '@/composables/accountStore';

export default {
  data() {
    return {
      originalRecept: null,
      nazivRecepta: '',
      opis: '',
      slika: null,
      vrstaJela: null
    };
  },
  methods: {
    handleFileUpload(event) {
      this.slika = event.target.files[0];
    },
    submitForm() {
      if (this.originalRecept.nazivRecepta === this.nazivRecepta &&
      this.originalRecept.opis === this.opis &&
      this.originalRecept.vrstaJela === this.vrstaJela &&
      !this.slika) {
    this.$router.go(-1);
    return;
  }

      const formData = new FormData();
      formData.append('recept_id', accountStore.state.receptId);
      formData.append('naziv_recepta', this.nazivRecepta);
      formData.append('opis', this.opis);
      if (this.slika) {
        formData.append('slika', this.slika);
      }
      formData.append('vrstajela', this.vrstaJela);

      const authToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

      axios.post('http://localhost:8000/api/updaterec', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(() => {
        this.$router.go(-1); 
      })
      .catch(error => {
        console.error('Došlo je do greške prilikom spremanja recepta:', error);
      });
    },
    getReceptData(id_recepta) {
      axios.get(`http://127.0.0.1:8000/api/dohvatirec/${id_recepta}`)
        .then(response => {
          this.originalRecept = response.data;
          this.nazivRecepta = response.data.naziv_recepta;
          this.opis = response.data.opis;
          this.vrstaJela = response.data.vrstajela;
        })
        .catch(error => {
          console.error('Došlo je do greške prilikom dohvaćanja recepta:', error);
        });
    }
  },
  created() {
    let receptId = accountStore.state.receptId;
    if (typeof sessionStorage !== 'undefined') {
      receptId = receptId || sessionStorage.getItem('receptId');
    }
    this.getReceptData(receptId);
  }
};
</script>

<style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  label {
    display: block;
  }
  input[type="text"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button[type="submit"] {
    padding: 0.5rem 1rem;
    background-color: #FF6347;
    color: white;
  }
</style>
