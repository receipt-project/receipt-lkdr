<template>
  <div>
    <span v-if="person">{{this.person.phone}}</span>
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import lkdr from "@/apiclients/lkdr";
import {TaxpayerPerson} from "@/apiclients/lkdr/LkdrAuthorizedApiClient";

@Component<Me>({
  mounted() {
    lkdr.onAuthStateChanged( auth => this.person = auth.taxpayerPerson)
  }
})
export default class Me extends Vue {

  person: TaxpayerPerson | null = null

  login(): void {
    lkdr.auth()
  }

  logout(): void {
    lkdr.logout()
  }

}
</script>
