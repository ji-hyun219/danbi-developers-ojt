import { axiosInstance } from "./libs";

async function runRouterPost() {
  const result = await axiosInstance
    .post("/fi/router", {
      secret: "12345678901234567890123456789012",
      payload: {
        authaction: "http://192.168.2.1:2050/nodogsplash_auth/?",
        clientip: "192.168.2.95",
        gatewayname: "Danbicorp",
        tok: "7faedc25",
        mac_addr: "68:ff:7b:90:d7:5f",
        user_mac: "7e:df:0e:14:ef:34",
      },
    })
    .catch((e) => e.response.data);
  console.log(result);
}

runRouterPost();
