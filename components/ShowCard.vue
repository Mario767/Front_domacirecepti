<template>
  <div class="recept-container">
    <h1 class="naslov">{{ recept.naziv_recepta }}</h1>
    
    <div class="slika-container">
      <img :src="'http://127.0.0.1:8000/' + recept.slika" alt="Slika recepta">
    </div>
    <h2 class="opis">{{ recept.opis }}</h2>
    
    <p>Prosječna ocjena: 
      <span v-for="n in 5" :key="n" class="star">
        <i v-if="n <= recept.prosjecnaOcjena" class="fas fa-star"></i>
        <i v-else class="far fa-star"></i>
      </span>
      &nbsp;<span>{{ recept.prosjecnaOcjena.toFixed(1) }}</span>
    </p>
    <div v-if="accountStore.getters.isLoggedIn()">
      <p>Ocijenite recept: 
        <div class="star-rating">
          <span v-for="(star, index) in stars" :key="index" class="star"
                @mouseover="setRating(index + 1)"
                @mouseout="setRating(rating)"
                @click="submitRating(index + 1)">
            <i :class="star"></i>
          </span>
        </div>
      </p>
    </div>
    <div v-if="accountStore.getters.isLoggedIn()">
      <form @submit.prevent="submitKomentar">
        <textarea v-model="noviKomentar" placeholder="Unesite svoj komentar ovdje"></textarea>
        <button type="submit">Pošalji komentar</button>
      </form>
    </div>
    <div v-for="komentar in recept.komentari" :key="komentar.datum_Komentara" class="komentar">
      <p>Korisnik: {{ komentar.korisnicko_ime }}</p>
      <p>Komentar: {{ komentar.sadržaj }}</p>
      <p>Datum komentara: {{ komentar.datum_Komentara }}</p>
    </div>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios';
import accountStore from '@/composables/accountStore';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default {
  props: {
    recept: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      noviKomentar: '',
      ocjena: 0,
      stars: Array(5).fill('far fa-star'),
      rating: 0
    };
  },
  methods: {
    setRating(rating) {
      this.rating = rating;
      this.stars = this.stars.map((star, index) => {
        if (index < rating) {
          return 'fas fa-star';
        } else if (index < rating + 0.5) {
          return 'fas fa-star-half-alt';
        } else {
          return 'far fa-star';
        }
      });
    },
    submitRating(rating) {
      const authToken = cookies.get('authToken');
      axios.post('http://127.0.0.1:8000/api/ocjena', {
        recept_id: this.recept.recept_id,
        ocjena: rating
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(() => {
        this.ocjena = rating;
        alert('Uspješno dodana ocjena!');
      })
      .catch(error => {
        console.error(error);
      });
    },
    submitKomentar() {
      const authToken = cookies.get('authToken');
      axios.post('http://127.0.0.1:8000/api/komentari', {
        idrecepta: this.recept.recept_id,
        sadržaj: this.noviKomentar
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(() => {
        this.noviKomentar = '';
        alert('Uspješno dodan komentar!');
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
};
</script>


<style scoped>
.recept-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.slika-container {
  width: 50%; /* Ovo je veličina okvira u kojem će se slika prikazivati */
  overflow: hidden; /* Ovo će osigurati da se slika ne prelijeva iz okvira */
}

.slika-container img {
  width: 100%; /* Slika će se prilagoditi veličini okvira */
  height: auto;
}

.recept-container .naslov {
  font-size: 2.5em; /* Povećajte veličinu naslova */
}

.recept-container .opis {
  font-size: 2em; /* Povećajte veličinu opisa */
}

.recept-container p {
  width: 100%;
  max-width: 600px; /* Prilagodite ovo prema potrebi */
}

.komentar {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
  border-radius: 15px; /* Komentar u oblaku */
}

.star {
  color: gold;
}
</style>
