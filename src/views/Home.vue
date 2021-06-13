<template>
  <div class="home">
    {{ phone }}
    <calendar-heatmap :values="stats" :end-date="new Date()" tooltip-unit="рублей"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import lkdr from "@/apiclients/lkdr";


@Component<Home>({
  mounted: function () {
    lkdr.init()
    if (lkdr.getAuth()) {
      this.loadPhone()
      this.loadStats()
    }

    lkdr.onAuthStateChanged(auth => {
      if (!auth) return;
      this.loadPhone();
      this.loadStats();
    });
  }
})
export default class Home extends Vue {
  phone: string | null = null;
  stats: any = [];

  async loadPhone(): Promise<void> {
    this.phone = (await lkdr.getTaxpayerPerson()).phone
  }

  loadStats(): void {
    let axios1 = lkdr.getAxios();
    axios1.post("/api/v1/receipt", {
      limit: 1000,
      offset: 0,
      dateFrom: null,
      dateTo: null,
      orderBy: "RECEIVE_DATE:DESC",
      inn: null
    })
      .then(response => response.data)
      .then(data => data?.receipts)
      .then((receipts: any[]) => receipts.map((receipt: any) => {
        return {date: receipt.createdDate.substring(0, 10), sum: parseFloat(receipt.totalSum)}
      }))
      .then((receipts: any[]) => {
        let result: any = {};
        for (let receipt of receipts) {
          let date = receipt.date;
          if (!result[date]) {
            result[date] = 0.0
          }
          result[date] += receipt.sum
        }
        return result;
      })
      .then((stats: any) => {
        let data = []
        for (let date in stats) {
          // noinspection JSUnfilteredForInLoop
          data.push({date: date, count: Math.floor(stats[date])})
        }
        return data
      })
      .then(stats => this.stats = stats)
  }

}
</script>
