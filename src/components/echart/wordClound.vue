<template>
  <div ref="wordCloudRef" style="width: 100%; height: 400px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as echarts from "echarts";
import "echarts-wordcloud";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  wordData: {
    type: Array,
    default: () => [],
  },
});

const wordCloudRef = ref(null);
let chartInstance: echarts.ECharts | null = null;

// 初始化图表
const initChart = () => {
  if (!wordCloudRef.value) return;
  chartInstance = echarts.init(wordCloudRef.value);

  const option = {
    tooltip: {},
    title: { text: props.title },
    series: [
      {
        type: "wordCloud",
        gridSize: 8,
        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        rotationStep: 45,
        shape: "circle",
        textStyle: {
          color: () => {
            return `rgb(${Math.round(Math.random() * 255)},${Math.round(
              Math.random() * 255
            )},${Math.round(Math.random() * 255)})`;
          },
        },
        data: props.wordData,
      },
    ],
  };

  chartInstance.setOption(option);
};

// 窗口自适应
const resizeChart = () => {
  chartInstance?.resize();
};

// 生命周期钩子
onMounted(() => {
  initChart();
  window.addEventListener("resize", resizeChart);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  chartInstance?.dispose();
});
</script>
