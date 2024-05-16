<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card-title class="rec">Cafe Badilico</v-card-title>
        <v-img
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            max-width="600"
        ></v-img>
        <br>
        <v-row><h1 class="rec1">Ocijeni</h1>

          <v-rating
              hover
              :length="5"
              :size="42"
              :model-value="3"
              active-color="warning"
          /></v-row>



        <div class="mt-10 sastojci"  >

          <h2 class="rec1">Sastojci</h2>
          <p>300 gr brasna</p>
          <p>150 gr mekog butera /maslaca</p>
          <p>1 zumance</p>
          <p>1 kasika hladne vode</p>
          <p>prstohvat soli</p>
          <p>Cimet mljeveni Podravka</p>
          <p>kardamom u prahu</p>
          <p>Muškatnog oraščića mljevenog Podravka</p>
          <p>mlevenog karanfilića</p>
          <p>konjak ili viski ( ili oboje )</p>
          <p>rum</p>
          <p>kandirana narandza</p>
          <p>1 jabuka</p>
          <p>suho voce , grozdjice , marelice , brusnice , sljive....</p>
        </div>

        <div class="mt-10"></div>

        <div class="mt-5">
          <h2 class="rec1">Priprema</h2>
          U mlako mlijeko dodati žličicu šećera, žličicu brašna i izmrvljeni kvasac. Dok se kvasac aktivira,
          umutiti mikserom jaja sa šećerom i vanilin šećerom. Dodati zatim ulje i još malo mutiti. Na kraju dodati
          naribanu limunovu koricu, malo soli, brašno, nadošli kvasac i grožđice. Sve sjediniti i istresti u namašćen i
          pobrašnjen kalup. Pokriti krpom i ostaviti na toplom oko 20 minuta.
        </div>
        <form @submit.prevent="submitComment">
          <textarea  v-model="newComment" placeholder="Dodajte novi komentar..." class="bg-gray-800 text-white w-full px-3 py-2 mt-2 comentari"></textarea>
          <button type="submit" class="bg-white text-black px-6 py-2 mt-4">Pošalji</button>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref } from 'vue'

const newComment = ref('')

function submitComment() {
  console.log(newComment.value)
  newComment.value = ''
}
</script>

<style scoped>
.rec{
  font-size:32px;
  text-align: center;
}
.rec1 {
  font-size:28px;
  text-align: center;
}
.sastojci {
  text-align: center;
}
.comentari {

}
</style>
