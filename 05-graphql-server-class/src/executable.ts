import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

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
  authorId: Int
  author: User
}
type Comment {
  id: Int
  content: String
  userId: Int
  postId: Int
  user: User
}
`);

// fake data
const posts = [{ id: 1, title: "Hello1", content: "World1", authorId: 1 }, { id: 2, title: "Hello2", content: "World2", authorId: 2 }, { id: 3, title: "Hello3", content: "World3", authorId: 3 }, { id: 4, title: "Hello4", content: "World4", authorId: 1 }]

const users = [{ id: 1, name: "eunchurn" }, { id: 2, name: "dayoung" }, { id: 3, name: "sinil" }]

const comments = [{ id: 1, content: "good", userId: 1, postId: 1 }, { id: 1, content: "not bad", userId: 2, postId: 1 }]

const resolvers = {
  Query: {
    posts: () => posts,
    post: (root: any, { id }: any) => posts.find(post => post.id === id),
    user: (root: any, { id }: any) => users.find(user => user.id === id)
  },
  User: {
    id: (root: any) => root.id,
    name: (root: any) => root.name,
    posts: ({ id }: any) => posts.filter(post => post.authorId === id)
  },
  Post: {
    id: (root: any) => root.id,
    title: (root: any) => root.title,
    content: (root: any) => root.content,
    comments: ({ id }: any) => comments.filter(comment => comment.postId === id),
    authorId: (root: any) => root.authorId,
    author: ({ authorId }: any) => users.find(user => user.id === authorId)
  },
  Comment: {
    id: (root: any) => root.id,
    content: (root: any) => root.content,
    postId: (root: any) => root.postId,
    userId: (root: any) => root.userId,
    user: ({ userId }: any) => users.find(user => user.id === userId)
  }
}

const executeableSchema = makeExecutableSchema({ typeDefs: schema, resolvers })

app.use("/", graphqlHTTP((request, response, graphQLParams) => {
  return { schema: executeableSchema, graphiql: true, context: { request, response } }
}))

app.listen(5005, () => {
  console.log("Listening http://localhost:5005")
})