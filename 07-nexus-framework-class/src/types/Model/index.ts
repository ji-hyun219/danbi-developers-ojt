import { objectType } from "nexus";
import { postsData, users, comments } from "../../db";
export const Post = objectType({
  name: "Post",
  description: "Post 타입",
  definition: (t) => {
    t.nonNull.int("id");
    t.string("title");
    t.string("content");
    t.int("authorId");
    t.field("author", {
      type: "User",
      resolve({ authorId }) {
        const user = users.find((user) => user.id === authorId);
        if (!user) throw new Error(`no user found with id = ${authorId}`);
        return user;
      },
    });
  },
});

export const User = objectType({
  name: "User",
  description: "사용자",
  definition(t) {
    t.nonNull.int("id");
    t.string("name");
    t.list.field("posts", {
      type: "Post",
      resolve({ id }) {
        const posts = postsData.filter((post) => post.authorId === id);
        return posts;
      },
    });
  },
});
