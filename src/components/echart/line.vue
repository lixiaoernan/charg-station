<template>
  <div ref="myLine" style="width: 100%; height: 400px"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  xData: {
    type: Array,
    default: () => [],
  },
  yData: {
    type: Array,
    default: () => [],
  },
});

const myLine = ref();
let chartInstance: echarts.ECharts | null = null;

// 初始化图表
const initChart = () => {
  if (!myLine.value) {
    return;
  }
  chartInstance = echarts.init(myLine.value);
  const option = {
    title: { text: props.title },
    tooltip: {},
    xAxis: { type: "category", data: props.xData },
    yAxis: { type: "value" },
    series: [
      {
        name: "销量",
        type: "line",
        data: props.yData,
      },
    ],
  };
  chartInstance.setOption(option);
};

// 窗口自适应
const resizeChart = () => {
  chartInstance?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  chartInstance?.dispose();
});
</script>
