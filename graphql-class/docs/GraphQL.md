# GraphQL.js

```
yarn add graphql
```

## Example

```typescript
import { graphql, buildSchema } from "graphql";

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const rootResolver = { hello: () => "Hello" }

graphql({ schema, source: "query { hello }", rootValue: rootResolver }).then(console.log);
```