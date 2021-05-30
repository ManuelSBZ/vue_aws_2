<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-chip
      v-if="showSignOut"
      class="ma-2"
      color="white"
      outlined
      pill
    >
      {{this.loggedUser.username}}
      <v-icon right>
        mdi-account-outline
      </v-icon>
    </v-chip>
      <v-spacer></v-spacer>
    <amplify-sign-out v-if="showSignOut"></amplify-sign-out>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(["showSignOut","loggedUser"])
}
}
</script>

