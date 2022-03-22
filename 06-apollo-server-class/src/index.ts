import { ApolloServer } from "apollo-server";
import { schema } from "./schema";

const server = new ApolloServer({ typeDefs: schema });

server.listen(5010, () => {
  console.log("Listening http://localhost:5010");
});
