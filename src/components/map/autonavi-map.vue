<template>
  <div class="map-container">
    <div ref="mapContainer" class="map"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ChargStation from "@/assets/charg-station.png";
import { getChargStationList } from "@/services/home";

// 地图容器引用
const mapContainer = ref(null);
let map: L.Map | null = null;

// 充电桩数据
const chargingStations = ref([] as any[]);

// 添加充电桩方法
const addChargingStation = () => {
  // 遍历充电桩数据，创建标记
  chargingStations.value.forEach((station) => {
    // 创建标记
    const marker = L.marker([station.lat, station.lng], {
      icon: L.icon({
        iconUrl: ChargStation,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
      interactive: true,
      title: station.name,
      alt: station.name,
      zIndexOffset: 1000,
    }).addTo(map);

    // 创建信息内容
    const popupContent = `
        <div style="padding: 10px;">
            <h4>${station.name}</h4>
            <p><strong>状态：</strong> ${station.status}</p>
            <p><strong>地址：</strong> ${station.address}</p>
            <p><strong>剩余车位：</strong> ${station.slots}</p>
        </div>
    `;

    // 绑定点击事件
    marker.bindPopup(popupContent, {
      direction: "top", // 提示框位置（可选：top, bottom, left, right）
      offset: [0, -25], // 提示框偏移量
      opacity: 0.9,
    });
  });
};

// 初始化地图
onMounted(async () => {
  const res = await getChargStationList();
  chargingStations.value = res;
  if (mapContainer.value) {
    map = L.map(mapContainer.value).setView([39.9042, 116.4074], 13); // 初始中心坐标和缩放级别

    // 高德地图普通地图（无需 Token）
    const amapUrl =
      "https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}";
    L.tileLayer(amapUrl, {
      subdomains: ["1", "2", "3", "4"],
      maxZoom: 18,
      attribution: "© AMap",
    }).addTo(map);

    // 添加标记
    addChargingStation();
  }
});

// 销毁地图
onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>
<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
.map {
  width: 100%;
  height: 100%;
}
</style>
