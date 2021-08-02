<template>
  <div>
      <apexchart type="treemap" :options="options" :series="treemapData"></apexchart>
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

  readonly options: any = {
    chart: {
      height: 500,
      events: {
        click: (event: any, chartContext: any, config: any) => {
          this.click(config);
        }
      }
    }
  }

  private click(config: any) {
    const series = this.treemapData[config.seriesIndex];
    const dataItem = series.data[config.dataPointIndex];
    const brandId = this.getBrandIdByName(dataItem.x);
    this.$emit("clickOnBrand", brandId)
  }

  getBrandForReceipt(receipt: ReceiptResponseReceipt): string | null {
    return (this.brands.find(it => it.id == receipt.brandId))?.name || null
  }

  getBrandIdByName(brandName: string) : number | null {
    const find = this.brands.find(it => it.name == brandName) || null;
    return find?.id || null
  }

  get treemapData(): { data: { x: string, y: number }[] }[] {
    if (!this.receiptList) return [];

    let companyToAmountMap: { [id: string] : number; } = {};
    this.receiptList.forEach(receipt => {
      const brandName = this.getBrandForReceipt(receipt) || receipt.kktOwner;
      companyToAmountMap[brandName] = (companyToAmountMap[brandName] || 0.0) + parseFloat(receipt.totalSum || "0.0");
    })

    let data: {x: string, y: number}[] = []
    for (const [key, value] of Object.entries(companyToAmountMap)) {
      data.push({x: key, y: value});
    }

    return [{data}];
  }

}
</script>
