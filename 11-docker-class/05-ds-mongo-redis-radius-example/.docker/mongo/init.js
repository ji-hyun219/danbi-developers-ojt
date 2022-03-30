const endpoints = {
  MONGODB1: "mongo1",
  MONGODB2: "mongo2",
  MONGODB3: "mongo3",
};
const cfg = {
  _id: "rs0",
  protocolVersion: NumberLong(1),
  version: 1,
  members: [
    {
      _id: 0,
      host: `${endpoints.MONGODB1}:27017`,
      priority: 10,
    },
    {
      _id: 1,
      host: `${endpoints.MONGODB2}:27017`,
      priority: 0,
    },
    {
      _id: 2,
      host: `${endpoints.MONGODB3}:27017`,
      arbiterOnly: true,
    },
  ],
};
function init() {
  const error = rs.initiate(cfg);
  printjson(error);
  printjson("Done! 🎉");
}
init();
const config = rs.conf();
printjson(config);
// try {
//   const config = rs.conf();
//   if (config._id === "rs0") {
//     printjson(config);
//   } else {
//     init();
//   }
// } catch (e) {
//   init();
// }
