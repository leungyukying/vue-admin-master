<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :padding="[100]">
      <v-coord type="rect" direction="LT"/>
      <v-tooltip/>
      <v-legend/>
      <v-axis data-key="value" position="right"/>
      <v-axis data-key="label" :label="label"/>
      <v-bar position="label*value" color="type" :adjust="adjust"/>
    </v-chart>
  </div>
</template>

<script>
const DataSet = require("@antv/data-set");

const sourceData = [
  {
    label: "监网测试医院.",
    预约检查人数: 1,
    完成检查人数: 0,
    预约检查量: 1,
    完成检查量: 0,
    完成检查量总费用: 356
  }
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: "fold",
  fields: [
    "预约检查人数",
    "完成检查人数",
    "预约检查量",
    "完成检查量",
    "完成检查量总费用"
  ],
  key: "type",
  value: "value"
});
const data = dv.rows;

const label = { offset: 12 };
const adjust = [{ type: "dodge", marginRatio: 1 / 32 }];

export default {
  data() {
    return {
      data,
      height: 400,
      label: label,
      adjust: adjust
    };
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss' scoped>
</style>