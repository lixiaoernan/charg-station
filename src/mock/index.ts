import Mock from "mockjs";

Mock.mock("/api/login", "post", {
  code: 200,
  data: {
    token: "mock-token",
  },
});

Mock.mock("/api/chargingStation", "get", {
  code: 200,
  data: [
    {
      name: "北京东城充电站",
      lat: 39.9241,
      lng: 116.4078,
      status: "可用",
      address: "北京市东城区王府井大街",
      slots: 3,
    },
    {
      name: "北京西城充电站",
      lat: 39.9432,
      lng: 116.3521,
      status: "占用",
      address: "北京市西城区金融街",
      slots: 2,
    },
    {
      name: "北京丰台充电站",
      lat: 39.8674,
      lng: 116.2983,
      status: "可用",
      address: "北京市丰台区卢沟桥",
      slots: 5,
    },
    {
      name: "北京石景山充电站",
      lat: 39.9612,
      lng: 116.1845,
      status: "占用",
      address: "北京市石景山区八大处",
      slots: 1,
    },
    {
      name: "北京通州充电站",
      lat: 39.9123,
      lng: 116.6456,
      status: "可用",
      address: "北京市通州区运河公园",
      slots: 6,
    },
    {
      name: "北京顺义充电站",
      lat: 40.0321,
      lng: 116.6345,
      status: "可用",
      address: "北京市顺义区临空经济区",
      slots: 4,
    },
    {
      name: "北京昌平充电站",
      lat: 40.1234,
      lng: 116.2567,
      status: "占用",
      address: "北京市昌平区回龙观",
      slots: 3,
    },
    {
      name: "北京大兴充电站",
      lat: 39.789,
      lng: 116.5432,
      status: "可用",
      address: "北京市大兴区亦庄开发区",
      slots: 7,
    },
    {
      name: "北京房山充电站",
      lat: 39.7456,
      lng: 115.8765,
      status: "占用",
      address: "北京市房山区长阳镇",
      slots: 2,
    },
    {
      name: "北京门头沟充电站",
      lat: 39.9876,
      lng: 115.9876,
      status: "可用",
      address: "北京市门头沟区潭柘寺",
      slots: 5,
    },
  ],
});
