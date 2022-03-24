import * as axiosInstanceAll from "../axiosInstance";
import { AxiosResponse } from "axios";

jest.mock("../axiosInstance", () => ({
  __esModule: true,
  ...jest.requireActual("../axiosInstance"),
}));

type AxiosReturn = AxiosResponse<{ error: boolean; message: string }>;

describe("axios instance test", () => {
  it("should return normal result", async () => {
    const fakeRes = {
      status: 200,
      statusText: "success",
      headers: { headers: "", "set-cookie": ["im cookie"] },
      data: { error: false, message: "hello, I'm named exported module" },
    } as unknown as AxiosReturn;
    const { axiosInstance } = axiosInstanceAll;
    jest.spyOn(axiosInstance, "post").mockResolvedValue(fakeRes);
    const result = await axiosInstanceAll.axiosInstance.post("/fi/router", {
      secret: "12345678901234567890123456789012",
      payload: {
        authaction: "http://192.168.2.1:2050/nodogsplash_auth/?",
        clientip: "192.168.2.95",
        gatewayname: "Danbicorp",
        tok: "7faedc25",
        mac_addr: "68:ff:7b:90:d7:5f",
        user_mac: "7e:df:0e:14:ef:34",
      },
    });
    expect(result.data).toEqual({
      error: false,
      message: "hello, I'm named exported module",
    });
  });
});
