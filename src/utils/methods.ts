/*
 * @Author: zhenghr zhenghr@neusoft.com
 * @Date: 2023-05-04 10:02:59
 * @LastEditors: zhenghr zhenghr@neusoft.com
 * @LastEditTime: 2023-12-21 14:41:51
 * @FilePath: \toxic-assets-ui\src\common\utils\methods.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { pinyin } from "pinyin-pro";
import { nextTick, toRef, toValue } from "vue";
import Sortable from "sortablejs";
import { cloneDeep } from "lodash";

/**
 * 筛选条件重置
 * @param conditionData 筛选条件
 */
export const reset = (
  conditionData: { [key: string]: any },
  disabledList?: any[],
  callback?: () => any
) => {
  for (let item in conditionData) {
    if (!disabledList || !disabledList.includes(item)) {
      if (conditionData[item] instanceof Array) {
        conditionData[item] = [];
      } else {
        conditionData[item] = undefined;
      }
    }
  }
  callback?.();
};

/**
 * 序号生成
 */
export const indexHandler = (index: any, paginationConfig: any) => {
  return (
    index + paginationConfig.pageSize * (paginationConfig.pageNumber - 1) + 1
  );
};

/**
 * 码表数据处理
 */
export const codeHandler = (codeTableData: any, res: any) => {
  for (let name in codeTableData) {
    codeTableData[name] = res.data[name].map((item: any) => {
      return {
        label: item.code_name,
        value: item.code_value,
      };
    });
  }
};

/**
 * 对象单级别字段名大小写转换
 */
export const objectCase = (object: any, mode: boolean) => {
  const newObject = Object();
  if (mode)
    for (let name in object) {
      newObject[name.toUpperCase()] = object[name];
    }
  else
    for (let name in object) {
      newObject[name.toLowerCase()] = object[name];
    }
  return newObject;
};

/**
 * 树节点下钻
 */
export const getGroupIds = (
  group: any,
  idName: string,
  childrenName: string
) => {
  if (!group) return undefined as any;
  let temp = group[idName] ? [group[idName]] : undefined;
  if (temp && group[childrenName] && group[childrenName].length !== 0) {
    group[childrenName].forEach((item: any) => {
      temp = (temp as any).concat(getGroupIds(item, idName, childrenName));
    });
  }
  return temp;
};

/**
 * 自动生成编码
 */
export const getCode = (val: any) => {
  return pinyin(val, { pattern: "first", toneType: "none", type: "array" })
    .join("")
    .toUpperCase() as any;
};

/**
 * 关闭对话框
 */
export const closeDialog = (tableData: any, dialogProp: any) => {
  for (let item in tableData.disabled) {
    tableData.disabled[item] = true;
  }
  dialogProp.show = false;
};

// 字符串下划线转驼峰
export const formatToHump = (value: any) => {
  return value.replace(/\_(\w)/g, (_: any, letter: any) =>
    letter.toUpperCase()
  );
};

// 字符串驼峰转下划线
export const formatToLine = (value: any) => {
  return value.replace(/([A-Z])/g, "_$1").toLowerCase();
};

// 树数据选中特定id数据
export const treeQuery = (
  data: Array<any>,
  id: any,
  idName: string,
  childrenName: string
): any => {
  let result = Object();
  treeSelector(data, id, idName, childrenName, result);
  return Object.keys(result).length === 0 ? undefined : result;
};
export const treeSelector = (
  data: Array<any>,
  id: any,
  idName: string,
  childrenName: string,
  result: any
): any => {
  for (let [index, item] of data.entries()) {
    if (item[idName] === id) {
      result.data = data;
      result.index = index;
      return;
    }
    if (item[childrenName] && item[childrenName].length !== 0)
      treeSelector(item[childrenName], id, idName, childrenName, result);
  }
};

/**
 * 自用文件下载方法封装(axios)
 */
export const downloadAxios = (res: any, name?: any) => {
  let blob = res.data;
  let reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = function (e) {
    let a = document.createElement("a");
    let fileNames = res.headers["content-disposition"].split("=");
    let fileName = fileNames[fileNames.length - 1];
    fileName = fileName.replace(/"/g, "");
    a.download = name ? name : fileName;
    a.href = e.target?.result as any;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
};

/**
 * 自用文件下载方法封装(本地)
 */
export const downloadLocal = (file: any) => {
  let a = document.createElement("a");
  a.download = file.name;
  a.href = file.url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/**
 * 通过url与文件名获取File对象
 */
export const getFileFromUrl = (url: any, fileName: any) => {
  return new Promise<File>((resolve, reject) => {
    let blob = null;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    // 加载时处理（异步）
    xhr.onload = () => {
      blob = xhr.response;
      let file = new File([blob], fileName, { type: blob.type });
      // 返回结果
      resolve(file);
    };
    xhr.onerror = (e) => {
      reject(e);
    };
    // 发送
    xhr.send();
  });
};

/**
 * 拷贝，脱离Proxy域
 */
export const deepClone = (data: any) => {
  return cloneDeep(data);
};

/**
 * 树筛选公用方法
 * @param value
 * @param data
 * @returns
 */
export const filterNode = (value: string, data: any, attribute: any) => {
  if (!value) return true;
  return data[attribute].includes(value);
};

/**
 * 树数据适配el-tree（自上到下）
 */
export const treeDataAdapterTopToBottom = (
  data: any[],
  idName: string,
  parentIdName: string
) => {
  const dataMap = new Map();
  for (let item of data) {
    item.children = Array<any>();
    dataMap.set(item[idName], item);
  }
  let i = -1;
  while (true) {
    i++;
    if (i === data.length) {
      break;
    }
    if (!data[i][parentIdName] || data[i][parentIdName] === "0") {
      continue;
    }
    if (dataMap.has(data[i][parentIdName])) {
      dataMap.get(data[i][parentIdName]).children.push(data[i]);
    }
    data.splice(i, 1);
    i--;
  }
};

/**
 * 表格拖拽排序（要在onMounted中或者之后只用）
 */
export const rowDrop = (data: any, className?: string) => {
  const tbody = document.querySelector(
    `${className ? "." + className + " " : ""}.el-table__body-wrapper tbody`
  );
  Sortable.create(tbody, {
    onEnd({ newIndex, oldIndex }: any) {
      if (newIndex === oldIndex) return;
      toValue(data).splice(newIndex, 0, toValue(data).splice(oldIndex, 1)[0]);
      const newArray = toValue(data).slice(0);
      toValue(data).length = 0;
      nextTick(() => {
        toRef(data).value = newArray;
      });
    },
  });
};

/**
 * 文件大小自动最上换算
 * @param bytes 字节数（bytes）
 * @returns 最简大小
 */
export const formatFileSize = (bytes: number) => {
  const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // 保留两位小数，四舍五入
  size = Math.round(size * 100) / 100;

  return `${size} ${units[unitIndex]}`;
};

/**
 * 防抖
 */
export class Debouncer {
  private timer: any;
  public constructor() {
    this.timer = {
      data: null,
    };
  }
  public debounce(func: any, time: any) {
    if (this.timer.data) {
      clearTimeout(this.timer.data);
    }
    this.timer.data = setTimeout(func, time);
  }
}
