<template>
  <div class="container-box">
    <div class="container">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="container-card"
        :class="{ 'is-select': stateData.isSelect[index] }"
        :style="{ cursor: selection && !disabled ? 'pointer' : 'default' }"
        @click="() => handleClick(index)"
        @dblclick="() => handleDblclick()">
        <div
          class="check-icon"
          :class="{ 'check-icon-select': stateData.isSelect[index] }">
          <div class="icon-box">
            <svg
              t="1745722500717"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2991"
              width="16"
              height="16">
              <path
                d="M380.343 801.646a53.394 53.394 0 0 1-36.572-16.092L125.44 568.32a55.589 55.589 0 0 1 0-77.166 54.126 54.126 0 0 1 76.8 0l178.103 179.2L835.29 272.091a53.394 53.394 0 0 1 76.435 0 54.126 54.126 0 0 1 0 76.8L418.743 785.554a54.491 54.491 0 0 1-38.4 16.092z"
                p-id="2992"
                fill="#ffffff"></path>
            </svg>
          </div>
        </div>
        <div class="line-container">
          <div :class="`line-${item.line}`" class="line-block">
            <div class="line-num">{{ item.line }}</div>
          </div>
          <div class="vehicle-container">
            <div class="vehicle">
              <div class="vehicle-item">桩ID:CP-001234</div>
              <div class="vehicle-item">名称:A区入口快充桩</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, watch } from "vue";

// 子组件属性定义
const props = defineProps({
  data: {
    type: Array<any>,
    default: [],
  },
  // 是否支持选择
  selection: {
    type: Boolean,
    default: false,
  },
  // 是否支持多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 禁用点击事件
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["selection-change", "data-change"]);
const { data, selection, multiple, disabled } = toRefs(props);

// 状态数据
const stateData = reactive({
  isSelect: Array<any>(),
  selectionNum: 0,
});
const handleClick = (index: any, enable = false) => {
  if (!disabled.value || enable)
    if (selection.value) {
      if (multiple.value) {
        stateData.isSelect[index]
          ? stateData.selectionNum--
          : stateData.selectionNum++;
        stateData.isSelect[index] = !stateData.isSelect[index];
      } else {
        if (stateData.isSelect[index]) {
          if (stateData.selectionNum === 1 || stateData.selectionNum > 1)
            stateData.isSelect[index] = false;
        } else {
          stateData.selectionNum === 1
            ? (stateData.isSelect.length = 0)
            : stateData.selectionNum++;
          stateData.isSelect[index] = true;
        }
      }
      emits("selection-change");
    }
};
const handleDblclick = (enable = false) => {
  if (!disabled.value || enable)
    if (selection.value && multiple.value) {
      let length = data.value.length;
      if (stateData.selectionNum === length) {
        stateData.selectionNum = 0;
        for (let i = 0; i < length; i++) stateData.isSelect[i] = false;
      } else {
        stateData.selectionNum = length;
        for (let i = 0; i < length; i++) stateData.isSelect[i] = true;
      }
      emits("selection-change");
    }
};
const getSelectionRows = () => {
  const tempData = data.value;
  return multiple.value
    ? tempData.filter((item: any, index: any) => stateData.isSelect[index]) ||
        []
    : tempData.find((item: any, index: any) => stateData.isSelect[index]);
};
// 清空已选中的数据
const clearSelectData = () => {
  stateData.isSelect = [];
};
// 选中某一个或某些数据
const selectData = (index: number | number[], isSelect?: Boolean) => {
  if (typeof index === "number") {
    console.log(stateData.isSelect[index.toString(10)]);
    if (
      (isSelect !== undefined &&
        stateData.isSelect[index.toString(10)] !== isSelect) ||
      isSelect === undefined
    )
      handleClick(index, true);
  } else if (Array.isArray(index)) {
    index.forEach((item) => {
      if (
        (isSelect !== undefined &&
          stateData.isSelect[item.toString(10)] !== isSelect) ||
        isSelect === undefined
      )
        handleClick(item, true);
    });
  }
};

// 监听数据
watch(
  [multiple, selection],
  () => {
    stateData.selectionNum = 0;
    stateData.isSelect = new Array<any>();
    emits("selection-change");
  },
  { deep: true }
);
watch(
  [data],
  () => {
    emits("data-change");
  },
  { deep: true }
);

// 暴露方法
defineExpose({ getSelectionRows, clearSelectData, selectData });
</script>

<style lang="scss" scoped>
.container-box {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    min-width: 100%;
  }

  .container-card {
    position: relative;
    width: 33%;
    border: 1px solid var(--el-border-color);
    border-radius: 8px;
    margin-bottom: 16px;
    overflow: hidden;
  }

  .container-card:hover {
    box-shadow: 0px 0px 12px var(--el-border-color) !important;
  }

  .is-select {
    border-color: #00d112;
  }
  .check-icon {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 8px 0 0 0;
    background: linear-gradient(to bottom right, #999999 50%, #f0f2f5 50%);
  }
  .check-icon-select {
    background: linear-gradient(to bottom right, #00d112 50%, #f0f2f5 50%);
  }
  .icon-box {
    position: absolute;
    top: 8px;
    left: 8px;
    border-radius: 8px;
  }

  .line-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 16px 24px 24px;
  }

  .line-block {
    border-radius: 8px;
    padding: 8px 16px 16px 16px;
    color: white;
    width: 80px;
    height: 70px;
    margin-top: 50px;
  }

  .line-num {
    width: 100%;
    height: 55px;
    line-height: 55px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
  }
  .line-text {
    width: 100%;
    text-align: center;
    font-size: 16px;
  }

  .vehicle-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 32px 0px 0px 60px;
    .vehicle {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      .vehicle-item {
        width: 49%;
      }
    }
  }

  .line-1 {
    background: red;
  }
  .line-2 {
    background: orange;
  }
  .line-3 {
    background: pink;
  }
  .line-4 {
    background: purple;
  }
  .line-9 {
    background: blue;
  }
  .line-10 {
    background: green;
  }
}
</style>
