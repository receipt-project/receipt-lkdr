<template>
  <div>
      <apexchart type="treemap" :options="{chart:{height: 500}}" :series="treemapData"></apexchart>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ReceiptResponseBrand, ReceiptResponseReceipt} from "@/apiclients/lkdr/LkdrAuthorizedApiClient";

@Component<TreemapChart>({})
export default class TreemapChart extends Vue {
  @Prop()
  receiptList: ReceiptResponseReceipt[] = [];

  @Prop()
  brands: ReceiptResponseBrand[] = [];

  getBrandForReceipt(receipt: ReceiptResponseReceipt): string | null {
    return (this.brands.find(it => it.id == receipt.brandId))?.name || null
  }

  get treemapData(): any[] {
    if (!this.receiptList) return [];

    let companyToAmountMap: any = {};
    this.receiptList.forEach(receipt => {
      const brandName = this.getBrandForReceipt(receipt) || receipt.kktOwner;
      companyToAmountMap[brandName] = (companyToAmountMap[brandName] || 0.0) + parseFloat(receipt.totalSum || "0.0");
    })

    let data = []
    for (const [key, value] of Object.entries(companyToAmountMap)) {
      data.push({x: key, y: value});
    }

    return [{data}];
  }

}
</script>
