import {
  mutationField,
  stringArg,
  arg,
  idArg,
  intArg,
  nonNull,
  nullable,
} from "nexus";

export const updatePost = mutationField("updatePost", {
  type: "Post",
  description: "글을 업데이트 함",
  args: { title: nonNull(stringArg({ description: "제목을 넣어주세요." })) },
  resolve(_root, { title }, ctx, info) {
    return { id: 1, title, content: "world" };
  },
});
