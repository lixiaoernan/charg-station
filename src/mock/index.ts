import Mock from "mockjs";

Mock.mock("/api/login", "post", {
  code: 200,
  data: {
    token: "mock-token",
  },
});
