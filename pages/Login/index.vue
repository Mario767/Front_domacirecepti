<template>
  <div id="app">
    <div  v-if="isLoggedIn">
      <h1>Prijavljeni ste</h1>
    </div>
    <div class="login-container" v-else>
      
      <h1 class="title">Domaći recepti</h1>
      <input class="input-field" type="text" placeholder="Unesi ime" v-model="korisnicko_ime" required />
      <input class="input-field" type="password" placeholder="Unesi lozinku" v-model="lozinka" required />
      <button class="login-button" @click.prevent="prijavi">Prijavi se</button>
      <div class="register-container">
        <p>Nemaš račun? <router-link to="/register" class="register-button">Registriraj se</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import accountStore from '@/composables/accountStore'; 

export default {
  data() {
    return {
      korisnicko_ime: '',
      lozinka: '',
      isLoggedIn: false
    }
  },
  async created() {
    this.isLoggedIn = accountStore.getters.isLoggedIn();
    if (this.isLoggedIn) {
      await nextTick();
      window.location.href = '/';
    }
  },
  methods: {
    async prijavi() {
      try {
        await fetch('http://localhost:8000/sanctum/csrf-cookie');
        const response = await fetch('http://localhost:8000/api/prijavi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            korisnicko_ime: this.korisnicko_ime,
            lozinka: this.lozinka
          })
        });
        const data = await response.json();
        if (data.access_token) {
          // Ako je prijava uspješna, postavite authToken kolačić
          document.cookie = `authToken=${data.access_token}; path=/`;
          // Spremite korisničko ime i e-mail u kolačiće
          document.cookie = `username=${this.korisnicko_ime}; path=/`;
          document.cookie = `email=mariomariola545@gmail.com; path=/`;
          // Preusmjerite korisnika na željenu rutu
          this.isLoggedIn = true;
        await nextTick();
        if (data.korisnik.uloga_id == 2) {
          window.location.href = '/admin';
        }  else {
          window.location.href = '/';
        }
      } else {
        console.log(data.message); // Poruka o neuspješnoj prijavi
      }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>




<style scoped>
body {
  background-color: #FFA07A;
}

#app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
}

.input-field {
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1em;
}

.login-button {
  width: 100%;
  padding: 15px;
  background-color: #FFA07A;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-top: 10px;
}

.register-container {
  margin-top: 10px;
  text-align: center;
}

.register-button {
  color: #FFA07A;
  text-decoration: none;
}

.app[v-cloak] {
  display: none;
}


</style>
