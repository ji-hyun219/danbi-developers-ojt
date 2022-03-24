import { intArg, nonNull, queryField, queryType } from "nexus";
import { postsData, users, comments } from "../../db";
// Query Type
export const Query = queryType({
  definition(t) {
    t.list.field("posts", {
      type: "Post",
      resolve() {
        return postsData;
      },
    });
  },
});

// Query fields
export const post = queryField("post", {
  type: "Post",
  description: "여러 Posts 쿼리",
  args: { id: nonNull(intArg()) },
  resolve(_root, { id }, ctx) {
    const post = postsData.find((post) => post.id === id);
    if (!post) throw new Error(`no post with id = ${id}`);
    return post;
  },
});

export const user = queryField("user", {
  type: "User",
  description: "사용자 쿼리",
  args: { id: nonNull(intArg()) },
  resolve(_root, { id }) {
    const user = users.find((user) => user.id === id);
    if (!user) throw new Error(`no user with id = ${id}`);
    return user;
  },
});
