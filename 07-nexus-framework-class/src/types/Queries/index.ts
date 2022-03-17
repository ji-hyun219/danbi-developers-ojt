import { queryField } from "nexus";

export const postQuery = queryField("postQuery", {
  type: "Post",
  deprecation: "안쓰임... 이유는 블라블라",
  resolve(_root, _args, ctx) {
    return { id: 1, title: "hello", content: "world" };
  },
});
