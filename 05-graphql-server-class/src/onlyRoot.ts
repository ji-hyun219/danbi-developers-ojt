import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

const app = express();
app.use(express.json());

const schema = buildSchema(`
type Query {
  posts: [Post]
  post(id: Int): Post
  user(id: Int): User
}

type User {
  id: Int
  name: String
  posts: [Post]
}
type Post {
  id: Int
  title: String
  content: String
  comments: [Comment]
  author: User
}
type Comment {
  id: Int
  content: String
  user: User
}
`);

// fake data
const posts = [{ id: 1, title: "Hello1", content: "World1", authorId: 1 }, { id: 2, title: "Hello2", content: "World2", authorId: 2 }, { id: 3, title: "Hello3", content: "World3", authorId: 3 }, { id: 4, title: "Hello4", content: "World4", authorId: 1 }]

const users = [{ id: 1, name: "eunchurn" }, { id: 2, name: "dayoung" }, { id: 3, name: "sinil" }]

const comments = [{ id: 1, content: "good", userId: 1, postId: 1 }, { id: 1, content: "not bad", userId: 2, postId: 1 }]

const query = {
  posts: (args: any, ctx: any) => {
    return posts.map(post => {
      const { authorId } = post;
      const author = users.find(user => user.id === authorId);
      return { ...post, author }
    })
  },
  post: (args: any, ctx: any) => {
    const { id } = args;
    return posts.find(post => post.id === id)
  },
  user: (args: any, ctx: any) => {
    const { id } = args;
    return { ...users.find(user => user.id === id), posts: posts.filter(post => post.authorId === id) }
  }
}

app.use("/", graphqlHTTP((request, response, graphQLParams) => {
  console.log(graphQLParams)
  return { schema, rootValue: { ...query }, graphiql: true, context: { request, response } }
}))

app.listen(5005, () => {
  console.log("Listening http://localhost:5005")
})