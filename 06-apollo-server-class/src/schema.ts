import { makeSchema } from "nexus";
import * as types from "./types";
import path from "path";

export const schema = makeSchema({
  types: types,
  outputs: {
    schema: path.join(__dirname, "generated/schema.gen.graphql"),
    typegen: path.join(__dirname, "generated/nexusTypes.gen.ts"),
  },
});
