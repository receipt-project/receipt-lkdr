<template>
  <div>
    <span v-if="person">{{this.person.phone}}</span>
    <button @click="login">Login</button>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import lkdr from "@/apiclients/lkdr";
import {TaxpayerPerson} from "@/apiclients/lkdr/LkdrAuthorizedApiClient";

@Component<Me>({
  mounted() {
    lkdr.onAuthStateChanged(async auth => this.person = await auth.getTaxpayerPerson())
  }
})
export default class Me extends Vue {

  person: TaxpayerPerson | null = null

  login(): void {
    lkdr.auth()
  }

}
</script>
