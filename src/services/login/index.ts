import request from "@/utils/request";

export const login = async (data: any) => {
  const result = await request.post("/api/login", data);
  return result.data;
};
