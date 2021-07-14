<template>
  <div>
    <div class="home">
      <calendar-heatmap :values="heatMapData" :end-date="new Date()" tooltip-unit="рублей"/>
    </div>

    <div>
      <apexchart type="treemap" :options="{chart:{height: 500}}" :series="treemapData"></apexchart>
    </div>
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
  receiptList: ReceiptResponseReceipt[] = [];
  brands: ReceiptResponseBrand[] = [];


  series = [
    {
      data: [
        {x: "New Delhi", y: 218,},
        {x: "Kolkata", y: 149,},
        {x: "Mumbai", y: 184,},
        {
          x: "Ahmedabad",
          y: 55,
        },
        {
          x: "Bangaluru",
          y: 84,
        },
        {
          x: "Pune",
          y: 31,
        },
        {
          x: "Chennai",
          y: 70,
        }
      ]
    }]

  getBrandForReceipt(receipt: ReceiptResponseReceipt): string | null {
    return (this.brands.find(it => it.id == receipt.brandId))?.name || null
  }

  get heatMapData(): any[] {
    const r1 = this.receiptList.map((receipt: any) => {
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

  get treemapData(): any[] {
    if (!this.receiptList) {
      return []
    }
    let result: any = {};
    this.receiptList.forEach(receipt => {
      const brandName = this.getBrandForReceipt(receipt) || receipt.kktOwner;
      result[brandName] = (result[brandName] || 0.0) + parseFloat(receipt.totalSum || "0.0");
      console.log(brandName + " " + receipt.totalSum + " " + result[brandName])
    })
    let data = []
    for (const [key, value] of Object.entries(result)) {
      data.push({x: key, y: value});
    }
    return [{data}];
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
