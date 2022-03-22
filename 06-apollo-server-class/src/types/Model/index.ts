import { objectType } from "nexus";

export const Post = objectType({
  name: "Post",
  description: "Poasdasdasdasasst",
  definition: (t) => {
    t.int("id");
    t.string("title");
    t.string("content");
  },
});
