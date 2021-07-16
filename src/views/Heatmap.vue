<template>
  <div>
    <DatesSelector @changed="dayTo = $event.dayTo; dayFrom=$event.dayFrom"/>

    <div class="home">
      <calendar-heatmap :values="heatMapData" :end-date="dayTo.toDate()" tooltip-unit="рублей"/>
    </div>

    <TreemapChart :brands="brands" :receipt-list="receiptListRanged"/>

    <table>
      <tr v-for="receipt in receiptList" :key="receipt.key">
        <td>{{ getBrandForReceipt(receipt) || receipt.kktOwner }}</td>
        <td>{{ receipt.totalSum }}</td>
        <td>{{ receipt.createdDate }}</td>
      </tr>
    </table>

  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import lkdr from "@/apiclients/lkdr";
import {ReceiptResponseBrand, ReceiptResponseReceipt} from "@/apiclients/lkdr/LkdrAuthorizedApiClient";
import TreemapChart from "@/components/TreemapChart.vue";
import DatesSelector from "@/components/DatesSelector.vue";
import dayjs from "dayjs";

@Component<Heatmap>({
  components: {DatesSelector, TreemapChart},
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
  receiptList: ReceiptResponseReceipt[] = [];
  brands: ReceiptResponseBrand[] = [];

  dayFrom = dayjs().year(dayjs().year() - 1);
  dayTo = dayjs()

  get receiptListRanged() {
    return this.receiptList.filter(it => {
      const date = dayjs(it.createdDate);
      return (date.isBefore(this.dayTo) || date == this.dayTo) &&
        (date.isAfter(this.dayFrom) || date == this.dayFrom);
    })
  }

  getBrandForReceipt(receipt: ReceiptResponseReceipt): string | null {
    return (this.brands.find(it => it.id == receipt.brandId))?.name || null
  }

  get heatMapData(): any[] {
    const r1 = this.receiptListRanged.map((receipt: any) => {
      return {date: receipt.createdDate.substring(0, 10), sum: parseFloat(receipt.totalSum)}
    })
    let result: any = {};
    for (let receipt of r1) {
      let date = receipt.date;
      if (!result[date]) {
        result[date] = 0.0
      }
      result[date] += receipt.sum
    }
    let data = []
    for (let date in result) {
      // noinspection JSUnfilteredForInLoop
      data.push({date: date, count: Math.floor(result[date])})
    }
    return data
  }

  async loadStats(): Promise<void> {
    let data = await lkdr.lkdrAuthorizedApiClient.receipt({
      limit: 1000,
      offset: 0,
      dateFrom: "2020-07-01T00:00:00",
      dateTo: null,
      orderBy: "RECEIVE_DATE:DESC",
      inn: null
    })

    this.brands = data.brands
    this.receiptList = (data.receipts).sort((a, b) => -a.createdDate.localeCompare(b.createdDate));
  }

}
</script>
