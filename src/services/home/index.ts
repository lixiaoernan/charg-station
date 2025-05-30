import request from "@/utils/request";

export const getChargStationList = async () => {
  const result = await request.get("/api/chargingStation");
  return result.data;
};
