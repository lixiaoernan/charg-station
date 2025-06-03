<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
          <Bar
            :title="barData.title"
            :x-data="barData.xData"
            :y-data="barData.yData"
            :y-data1="barData.yData1">
          </Bar>
        </el-col>
        <el-col :span="12">
          <Line
            :title="lineData.title"
            :x-data="lineData.xData"
            :y-data="lineData.yData">
          </Line>
        </el-col>
        <el-col :span="12">
          <LineBarMix
            :title="lineBarData.title"
            :x-data="lineBarData.xData"
            :bar-data="lineBarData.barData"
            :line-data="lineBarData.lineData"
            :legend-data="lineBarData.legendData">
          </LineBarMix>
        </el-col>
        <el-col :span="12">
          <WordClound :title="wordData.title" :word-data="wordData.wordData">
          </WordClound>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import Bar from "@/components/echart/bar.vue";
import Line from "@/components/echart/line.vue";
import WordClound from "@/components/echart/wordClound.vue";
import LineBarMix from "@/components/echart/lineBarMix.vue";
import { reactive } from "vue";

const barData = reactive({
  title: "各区域充电桩日充电量对比",
  xData: ["A区", "B区", "C区", "D区", "E区"],
  yData: [1240, 2350, 980, 1870, 3100],
  yData1: [860, 1450, 620, 1030, 2050],
});

const lineData = reactive({
  title: "24小时充电桩使用率趋势",
  xData: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  yData: [85, 78, 50, 30, 20, 45],
});

const lineBarData = reactive({
  title: "充电量与平均充电时长",
  xData: ["早高峰(7-9)", "午间(12-14)", "傍晚(17-19)", "夜间(20-24)"],
  barData: [2400, 1500, 4000, 1800],
  lineData: [45, 50, 55, 60],
  legendData: ["充电量(kWh)", "平均时长(分钟)"],
});

const wordData = reactive({
  title: "用户反馈高频关键词",
  wordData: [
    { name: "充电速度慢", value: 42 },
    { name: "设备故障", value: 35 },
    { name: "排队等待", value: 30 },
    { name: "支付失败", value: 28 },
    { name: "导航不准", value: 22 },
    { name: "价格偏高", value: 18 },
    { name: "充电枪损坏", value: 15 },
    { name: "网络中断", value: 12 },
  ],
});
</script>
