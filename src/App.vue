<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-toolbar-title class="mx-2">LKDR</v-toolbar-title>
      </div>

      <router-link to="/" v-slot="{ href }" custom>
        <v-btn :href="href" text>
          <span>Home</span>
        </v-btn>
      </router-link>

      <router-link to="/me" v-slot="{ href }" custom>
        <v-btn :href="href" text>
          <span>Me</span>
        </v-btn>
      </router-link>

      <router-link to="/legal" v-slot="{ href }" custom>
        <v-btn :href="href" text>
          <span>Legal</span>
        </v-btn>
      </router-link>

      <v-spacer/>

      <v-btn
        href="https://github.com/receipt-project/receipt-lkdr"
        target="_blank"
        text
      >
        <v-icon class="mr-2">mdi-github</v-icon>
        <span>GitHub</span>
      </v-btn>
    </v-app-bar>


    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import lkdr from "@/apiclients/lkdr";

@Component<App>({
  mounted() {
    lkdr.onAuthStateChanged(it => {
      this.$store.commit("lkdr/setUserProfile", it)
    })
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
