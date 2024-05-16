<template>
  <div id="app">
    <div class="login-container">
      <h1 class="title">Domaći recepti</h1>
      <div v-if="!showConfirmationCodeInput && !registrationSuccess">
        <input class="input-field" type="text" placeholder="Unesi korisničko ime" v-model="korisnicko_ime" />
        <input class="input-field" type="email" placeholder="Unesi email" v-model="email" />
        <input class="input-field" type="password" placeholder="Unesi lozinku" v-model="lozinka" />
        <input class="input-field" type="password" placeholder="Potvrdi lozinku" v-model="potvrda_lozinke" />
        <button class="register-button" @click="sendConfirmationCode">Registriraj se</button>
      </div>
      <div v-else-if="showConfirmationCodeInput && !registrationSuccess">
        <input class="input-field" type="text" placeholder="Unesi kod za potvrdu" v-model="confirmationCode" />
        <button class="register-button" @click="confirmCode">Potvrdi kod</button>
        <button class="register-button" @click="resendConfirmationCode">Ponovno pošalji kod</button>
        <p v-if="preostaloVrijeme > 0">Kod ističe za: {{ preostaloVrijeme }} sekundi</p>
        <p v-else>Kod je istekao. Ponovno pošaljite kod za prijavu.</p>
      </div>
      <div v-else-if="registrationSuccess">
        <h2>Uspješna registracija!</h2>
        <p>Bit ćete preusmjereni na stranicu za prijavu...</p>
      </div>
      <p v-if="greska" class="error-message">{{ greska }}</p>
      <div v-if="obavijest" :class="{ snackbar: true, show: showSnackbar }">{{ obavijest }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const korisnicko_ime = ref('')
const lozinka = ref('')
const email = ref('')
const potvrda_lozinke = ref('')
const confirmationCode = ref('')
const showConfirmationCodeInput = ref(false)
const greska = ref('')
const registrationSuccess = ref(false)
const obavijest = ref('')
const showSnackbar = ref(false)
const preostaloVrijeme = ref('')

let countdownInterval = null

const startCountdown = () => {
  clearInterval(countdownInterval); // Resetirajte odbrojavanje
  let timeLeft = 180; // 3 minute
  countdownInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      preostaloVrijeme.value = timeLeft;
    } else {
      clearInterval(countdownInterval);
      preostaloVrijeme.value = '';
    }
  }, 1000);
}

const sendConfirmationCode = async () => {
  if (lozinka.value !== potvrda_lozinke.value) {
    greska.value = 'Lozinke nisu iste'
    return
  }
  try {
    const response = await axios.post('http://localhost:8000/api/sendcode', {
      
      email: email.value,
    })
    console.log(response)
    if (response.status === 200) {
      showConfirmationCodeInput.value = true
      startCountdown()
    }
  } catch (error) {
    console.error(error)
  }
}

const confirmCode = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/confirmcode', {
      confirmationCode: confirmationCode.value,
      korisnicko_ime: korisnicko_ime.value,
      lozinka: lozinka.value,
      email: email.value,
    });
    console.log(response);
    if (response.data.message === 'Registracija uspješna!') {
      registrationSuccess.value = true;
      obavijest.value = 'Registracija uspješna!';
      showSnackbar.value = true;
      clearInterval(countdownInterval);
      setTimeout(() => {
        router.push('/login');
      }, 2000); // Automatsko preusmjeravanje nakon 2 sekunde
    } else {
      obavijest.value = response.data.message;
      showSnackbar.value = true;
      setTimeout(() => {
        showSnackbar.value = false;
      }, 3000); // Automatsko skrivanje obavijesti nakon 3 sekunde
    }
  } catch (error) {
    console.error(error);
  }
};

const resendConfirmationCode = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/sendcode', {
      korisnicko_ime: korisnicko_ime.value,
      lozinka: lozinka.value,
      email: email.value,
    })
    console.log(response)
    if (response.status === 200) {
      startCountdown()
    }
  } catch (error) {
    console.error(error)
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

.register-button {
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

.error-message {
  color: red;
}

.snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
}

.snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;} 
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}
</style>
