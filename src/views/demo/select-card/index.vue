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
import CardCapacity from "@/components/card/charg-card.vue";

const data = ref([
  {
    id: "CP-001235",
    line: "2",
    name: "B区出口慢充桩",
    latitude: "30.2345° N",
    longitude: "120.5678° E",
    address: "上海市浦东新区张江路200号",
  },
  {
    id: "CP-001236",
    line: "3",
    name: "C区停车场直流桩",
    latitude: "31.2456° N",
    longitude: "121.4890° E",
    address: "上海市徐汇区漕溪路50号",
  },
  {
    id: "CP-001237",
    line: "4",
    name: "D区地铁站快充桩",
    latitude: "30.9876° N",
    longitude: "121.1234° E",
    address: "上海市静安区南京西路88号",
  },
  {
    id: "CP-001238",
    line: "5",
    name: "E区商场交流桩",
    latitude: "31.1234° N",
    longitude: "121.6789° E",
    address: "北京市朝阳区建国路100号",
  },
  {
    id: "CP-001239",
    line: "6",
    name: "F区住宅区直流桩",
    latitude: "39.9042° N",
    longitude: "116.4074° E",
    address: "北京市海淀区中关村大街59号",
  },
  {
    id: "CP-001240",
    line: "7",
    name: "G区高速服务区快充桩",
    latitude: "23.1291° N",
    longitude: "113.2644° E",
    address: "广州市天河区华南快速路123号",
  },
  {
    id: "CP-001241",
    line: "8",
    name: "H区大学校园交流桩",
    latitude: "22.3027° N",
    longitude: "114.0579° E",
    address: "深圳市南山区科技园中路15号",
  },
  {
    id: "CP-001242",
    line: "9",
    name: "I区工业区直流桩",
    latitude: "31.2304° N",
    longitude: "121.4737° E",
    address: "上海市浦东新区金吉路100号",
  },
  {
    id: "CP-001243",
    line: "10",
    name: "J区医院慢充桩",
    latitude: "31.2304° N",
    longitude: "121.4737° E",
    address: "上海市浦东新区浦电路123号",
  },
  {
    id: "CP-001244",
    line: "11",
    name: "K区交通枢纽快充桩",
    latitude: "31.2304° N",
    longitude: "121.4737° E",
    address: "上海市浦东新区迎春路456号",
  },
]);
const myCardTable = ref();
const selectButtonType = ref();
const selectButtonScene = ref();

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
