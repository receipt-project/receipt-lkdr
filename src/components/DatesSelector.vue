<template>
  <div class="row">
    <DatePicker v-model="datesRange" range></DatePicker>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import dayjs from "dayjs";

@Component<DatesSelector>({
  watch: {
    datesRange(value) {
      if (!value) return;
      this.dayFrom = dayjs(value[0]);
      this.dayTo = dayjs(value[1]);
      this.emitDates()
    }
  }
})
export default class DatesSelector extends Vue {
  datesRange: string | null = null;

  dayFrom: dayjs.Dayjs = dayjs().year(dayjs().year() - 1)
  dayTo: dayjs.Dayjs = dayjs()

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
