<script setup lang="ts">
import {ref} from 'vue'
const router = useRouter()

definePageMeta({
  layout: 'login'
})

const login = () => {
  router.push({ path: "/admin" })
}
</script>

<template>
  <v-container fill-height class="!tw-h-full">
    <v-row align="center" justify="center" class="!tw-h-full">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12 tw-bg-white tw-rounded">
          <v-toolbar color="sum-blue" >
            <v-toolbar-title>Forma za prijavu</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="mdi-account"
                  type="text"
              ></v-text-field>
              <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="sum-blue" @click="login">Prijava</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>