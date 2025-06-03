<template>
  <el-container>
    <el-main class="h-full w-full">
      <card-capacity
        ref="myCardTable"
        class="mt-5"
        selection
        multiple
        :data="data"
        @selection-change="handleSelectionChange"
        @data-change="handleDataChange">
      </card-capacity>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick } from "vue";
import CardCapacity from "./card-capacity.vue";

const data = ref([
  {
    line: "1",
    carCount: "20",
    carCountAll: "80",
    yunli: "14400",
  },
  {
    line: "2",
    carCount: "20",
    carCountAll: "80",
    yunli: "14400",
  },
  {
    line: "3",
    carCount: "20",
    carCountAll: "80",
    yunli: "14400",
  },
  {
    line: "4",
    carCount: "20",
    carCountAll: "80",
    yunli: "14400",
  },
  {
    line: "9",
    carCount: "20",
    carCountAll: "80",
    yunli: "14400",
  },
  {
    line: "10",
    carCount: "20",
    carCountAll: "80",
    yunli: "14400",
  },
]);
const myCardTable = ref();
const selectButtonType = ref();
const selectButtonScene = ref();

const selectDataType = ref();
const selectDataScheme = ref();
const selectCapacity = ref();

const handleSelectionChange = () => {
  selectCapacity.value = myCardTable.value?.getSelectionRows();
  handleCapacityDesc(selectCapacity.value);
};
const handleDataChange = () => {
  selectDataScheme.value = selectButtonScene.value?.getSelectionRows();
  handleCapacityDesc(selectCapacity.value);
};

// 处理运力配置描述字符串
const capaCityDesStr = ref("");
const handleCapacityDesc = (capacityData: any) => {
  const capacityDesc = ["全线网运力：144300/小时"];
  for (let i = 0; i < capacityData.length; i++) {
    const item = capacityData[i];
    capacityDesc.push(
      `${item.line}号线上线车辆${item.carCount}；运力${item.yunli}/小时`
    );
  }
  capaCityDesStr.value = capacityDesc.join("；");
};
onMounted(async () => {
  await nextTick();
  myCardTable.value?.selectData(0, true);
  selectButtonType.value?.selectData(0, true);
  selectButtonScene.value?.selectData([0, 1], true);
});
</script>
<style lang="scss" scoped></style>
