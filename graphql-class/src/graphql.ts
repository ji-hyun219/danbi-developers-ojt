import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    hello: String
    post: Post
  }
  type Post {
    title: String
    content: Content
  }
  type Content {
    imgUrl: String
    text: String
  }
`);

const rootResolver = {
  hello: () => "Hello",
  post: () => { return { title: "World", content: fieldResolver.content } }
}

const fieldResolver = {
  content: (root: any, args: any, ctx: any, info: any) => { console.log({ root, args, ctx, info }); return { imgUrl: "imgUrl", text: "Text " } }
}

const source = `
query {
  hello
  post {
    title
    content {
      imgUrl
    }
  }
}
`


graphql({ schema, source, rootValue: rootResolver }).then(JSON.stringify).then(console.log);