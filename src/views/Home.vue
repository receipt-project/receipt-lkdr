<template>
  <v-container>
    <v-row>
      <v-spacer/>
      <v-col>
        <DatesSelector class="my-2" @changed="dayTo = $event.dayTo; dayFrom=$event.dayFrom"/>
      </v-col>
      <v-spacer/>
    </v-row>
    <v-row>
      <v-col>
        <v-select v-model="brandsSelected" :items="brands" item-text="name"
          return-object="true" label="Магазины" chips clearable multiple outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <calendar-heatmap :values="heatMapData" :end-date="dayTo.toDate()" tooltip-unit="рублей"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TreemapChart :brands="brands" :receipt-list="receiptListRanged" @clickOnBrand="selectBrand($event)"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
            <tr v-for="receipt in receiptListRanged" :key="receipt.key">
              <td>
                <v-avatar tile>
                  <img :src="getBrandImageForReceipt(receipt)">
                </v-avatar>
              </td>
              <td>{{ getBrandForReceipt(receipt) || receipt.kktOwner }}</td>
              <td>{{ receipt.totalSum }}</td>
              <td>{{ receipt.createdDate }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import lkdr from "@/apiclients/lkdr";
import {ReceiptResponseBrand, ReceiptResponseReceipt} from "@/apiclients/lkdr/LkdrAuthorizedApiClient";
import TreemapChart from "@/components/TreemapChart.vue";
import DatesSelector from "@/components/DatesSelector.vue";
import dayjs from "dayjs";

@Component<Home>({
  components: {DatesSelector, TreemapChart},
  mounted: function () {
    if (lkdr.getAuth()) {
      this.loadStats()
    }

    lkdr.onAuthStateChanged(auth => {
      if (!auth) return;
      this.loadStats();
    });
  }
})
export default class Home extends Vue {
  receiptList: ReceiptResponseReceipt[] = [];
  brands: ReceiptResponseBrand[] = [];

  dayFrom = dayjs().year(dayjs().year() - 1);
  dayTo = dayjs()
  brandsSelected: ReceiptResponseBrand[] = [];

  get receiptListRanged(): ReceiptResponseReceipt[] {
    return this.receiptList
      .filter(it => {
        const date = dayjs(it.createdDate);
        return (date.isBefore(this.dayTo) || date == this.dayTo) &&
          (date.isAfter(this.dayFrom) || date == this.dayFrom);
      })
      .filter(it => {
        if (!!this.brandsSelected && this.brandsSelected.length > 0) {
          return !!this.brandsSelected.find(brand => it.brandId === brand.id)
        } else {
          return true;
        }
      })
  }

  getBrandForReceipt(receipt: ReceiptResponseReceipt): string | null {
    return (this.brands.find(it => it.id == receipt.brandId))?.name || null
  }

  getBrandImageForReceipt(receipt: ReceiptResponseReceipt): string | null {
    const image = (this.brands.find(it => it.id == receipt.brandId))?.image;
    if (image == null) return null;
    return "data:image/png;base64, " + image;
  }

  get heatMapData(): any[] {
    const r1 = this.receiptListRanged.map((receipt: any) => {
      return {weekday: receipt.createdDate.substring(0, 10), sum: parseFloat(receipt.totalSum)}
    })
    let result: any = {};
    for (let receipt of r1) {
      let date = receipt.weekday;
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

  selectBrand(brandId: number) {
    const selectedBrand = this.brands.find(brand => brand.id === brandId);
    this.brandsSelected = selectedBrand ? [selectedBrand] : [];
  }

  async loadStats(): Promise<void> {
    let data = await lkdr.api.receipt({
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
