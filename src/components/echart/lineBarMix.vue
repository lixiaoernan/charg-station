<template>
  <div ref="chartRef" style="width: 100%; height: 400px"></div>
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
  barData: {
    type: Array,
    default: () => [],
  },
  lineData: {
    type: Array,
    default: () => [],
  },
  legendData: {
    type: Array,
    default: () => [],
  },
});

const chartRef = ref(null);
let chartInstance: echarts.ECharts | null = null;

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;
  chartInstance = echarts.init(chartRef.value);

  const option = {
    title: { text: props.title },
    grid: { top: "20%" },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    legend: {
      data: props.legendData,
      left: "center",
      top: 12,
    },
    xAxis: {
      type: "category",
      data: props.xData,
    },
    yAxis: [
      {
        type: "value",
        name: props.legendData[0],
        min: 0,
        max: 35,
        interval: 5,
        axisLine: {
          lineStyle: {
            color: "#45C2E0", // 柱状图 y 轴颜色
          },
        },
      },
      {
        type: "value",
        name: props.legendData[1],
        min: 0,
        max: 70,
        interval: 10,
        position: "right",
        axisLine: {
          lineStyle: {
            color: "#FF6666", // 折线图 y 轴颜色
          },
        },
      },
    ],
    series: [
      {
        name: props.legendData[0],
        type: "bar",
        data: props.barData,
        itemStyle: {
          color: "#45C2E0",
        },
      },
      {
        name: props.legendData[1],
        type: "line",
        data: props.lineData,
        yAxisIndex: 1, // 指定使用右侧 y 轴
        itemStyle: {
          color: "#FF6666",
        },
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

// 销毁实例
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  chartInstance?.dispose();
});
</script>
