<template>
  <div id="main">
    <h1 class="text-center">this is main page.</h1>
    <v-lazy>
      <v-card
          class="greeting mx-auto"
          max-width="334"
          outlined
      >
        <v-card-title>
          HELLO!
        </v-card-title>
        <v-card-subtitle>
          I'm card component from Vuetify!
        </v-card-subtitle>
        <v-card-text>
          Vuetifyってなんですか？？？？？
        </v-card-text>
      </v-card>

      <v-spacer></v-spacer>

      <v-card
        class="uma mx-auto"
        max-width="334"
      >
        <v-img
            class="white--text align-end"
            src="/images/animal_uma_ninjin.png"></v-img>
        <v-card-title>
          UMA
        </v-card-title>
      </v-card>

      <v-card>

      </v-card>
    </v-lazy>
  </div>
</template>

<style scoped>
  h1{
    color: white;
    background-color: #2fa360;
  }
</style>