<template>
  <div class="home">
    <calendar-heatmap :values="stats" :end-date="new Date()" tooltip-unit="рублей"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import lkdr from "@/apiclients/lkdr";

@Component<Heatmap>({
  mounted: function () {
    lkdr.init()
    if (lkdr.getAuth()) {
      this.loadStats()
    }

    lkdr.onAuthStateChanged(auth => {
      if (!auth) return;
      this.loadStats();
    });
  }
})
export default class Heatmap extends Vue {
  stats: any = [];

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
