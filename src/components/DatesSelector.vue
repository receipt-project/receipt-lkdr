<template>
  <div>
    <div>
      <button v-for="year in years" :key="year" @click="clickYear(year)">
        {{ year }}
      </button>
    </div>
    <div>
      <button v-for="month in months" :key="month" @click="clickMonth(month)">
        {{ String(month).padStart(2, "0") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import dayjs from "dayjs";

@Component<DatesSelector>({})
export default class DatesSelector extends Vue {
  years = [2018, 2019, 2020, 2021]
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  selectedYear = 2021
  selectedMonth = 1;

  dayFrom: dayjs.Dayjs = dayjs().year(this.selectedYear).startOf("year")
  dayTo: dayjs.Dayjs = dayjs().year(this.selectedYear).endOf("year")

  clickMonth(month: number) {
    this.selectedMonth = month
    this.dayFrom = dayjs().year(this.selectedYear).month(this.selectedMonth - 1).startOf("month")
    this.dayTo = dayjs().year(this.selectedYear).month(this.selectedMonth - 1).endOf("month")
    this.emitDates()
  }

  clickYear(year: number) {
    this.selectedYear = year
    this.dayFrom = dayjs().year(this.selectedYear).startOf("year")
    this.dayTo = dayjs().year(this.selectedYear).endOf("year")
    this.emitDates()
  }

  private emitDates() {
    this.$emit("changed", {
      dayFrom: this.dayFrom,
      dayTo: this.dayTo
    })
  }
}
</script>

<style scoped>
button {
    width: 70px;
    height: 40px;
    margin: 5px;
    background-color: rgb(115, 179, 243);
    color: white;
    font-weight: bold;
    font-size: 1.3em;
    border-radius: 4px;
}
</style>
