import { graphql, buildSchema, GraphQLFieldResolver } from "graphql";

const schema = buildSchema(`
  type Query {
    post: Post
  }
  type User {
    id: Int
    name: String
    posts: [Post]
  }
  type Post {
    title: String
    content: String
    author: User
  }
`);

const resolvers = {
  Query: {
    post(root: any, args: any) {
      return {
        title: "Hello",
        content: "This is sample content",
        author: {
          id: 1,
          name: "ecpark",
          posts: [
            {
              title: "World",
              content: "This is world content",
            },
          ],
        },
      };
    },
  },
  User: {
    id(root: any, args: any) {
      return root.id;
    },
    name(root: any, args: any) {
      return root.name;
    },
    posts(root: any, args: any) {
      return root.posts;
    },
  },
  Post: {
    title(root: any, args: any) {
      return root.title;
    },
    content(root: any, args: any) {
      return root.content;
    },
    author(root: any, args: any) {
      root.author;
    },
  },
};

const source = `
query {
  post {
    title
    content
  }
}
`;

graphql({
  schema,
  source,
  rootValue: resolvers.Query,
  // typeResolver: resolvers.Post,
})
  // .then(JSON.stringify)
  .then(console.log);
