import { makeSchema } from "nexus";
import path from "path";
import * as types from "./types";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";

const app = express();

console.log(types);

const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(__dirname, "generated/schema.gen.graphql"),
    typegen: path.join(__dirname, "generated/nexusTypes.gen.ts"),
  },
});

app.use(cors({ origin: "http://localhost:3000" }));
app.use(graphqlHTTP({ schema, graphiql: true }));

app.listen(5006, () => {
  console.log("Listening http://localhost:5006");
});
