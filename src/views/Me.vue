<template>
  <div>
    <div class="row mt-3">
      <div class="col">
        <span v-if="person">{{ this.person.phone }}</span>
        <span v-else>Unauthorized</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <v-btn v-if="!person" @click="login">Login</v-btn>
        <v-btn v-else @click="logout">Logout</v-btn>
      </div>
    </div>
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
    lkdr.doAuth()
      .auth(prompt("Your number (79XXXXXXXXX)", "") || "")
      .otp(() => prompt("SMS Code", "") || "")
  }

  logout(): void {
    lkdr.logout()
  }

}
</script>
