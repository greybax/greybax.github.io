### Title options:

- GraphQL hoje para aplicações client-side que ainda dependem de APIs REST.
- GraphQL today using Apollo for applications that still depend on REST apis
- Wrapping REST apis with GraphQL using Apollo stack

# GraphQL today using Apollo for applications that still depend on REST APIs

Even though people using GraphQL are often extremely excited about the technology, it's popularity is [still growing slowly](https://trends.google.com/trends/explore?date=2014-03-14%202017-03-14&q=GraphQL). Developers working on client-side applications are the ones to benefit more from GraphQL, but migrating a backend from a working REST API might not be economically justifiable for most teams. What most don't realize, though, is that it is not completely necessary to make the switch on both sides before adopting the technology. The main [JavaScript implementation](https://github.com/graphql/graphql-js) of a GraphQL server runs just fine on the browser, and [Apollo](http://www.apollodata.com/) makes it easy as cake to start using it today.

> If you plan to use Relay to achieve REST API wrapping with GraphQL, you should definitely check [this post](http://graphql.org/blog/rest-api-graphql-wrapper/) in the official GraphQL blog.

## Who/what is Apollo?

GraphQL is ultimately only a protocol, meaning there are [dozens of projects](https://github.com/chentsulin/awesome-graphql) for both client and server side implementations of it. [Apollo](http://www.apollodata.com/), in the other hand, is a suite of open-source tools & products built by (*very nice folks at*) the [Meteor Development Group](https://jobs.lever.co/meteor).

Among these projects, there is [graphql-tools](https://github.com/apollographql/graphql-tools), which facilitates the creation of a executable schema, and [apollo-client](https://github.com/apollographql/apollo-client), which presents itself as "*The fully-featured, production ready caching GraphQL client for every server or UI framework*". Quite bold, huh?

## Resolving GraphQL in the browser

The first problem to be solved here is how to run a GraphQL server/resolver in the client-side. To be honest, it is not much of a problem really. As I said before, the main JavaScript implementation of GraphQL works in the browser, and all we have to do is use it as we would in a Node server. So let's go on with it.

### Installation

We are going to need two schema building tools:

```sh
yarn add --save graphql graphql-tools
``` 

> Missing NPM in the command? You should definitely give [Yarn](https://yarnpkg.com/pt-BR/) a try ;)

### Building the GraphQL Schema

First things first. The JavaScript implementation of GraphQL will ultimately need an instance of GraphQLSchema to work with. Creating such a schema is easy as instantiating this class:

```js
import { GraphQLSchema } from 'graphql';

export default new GraphQLSchema({
  query: QueryType,
});

```

But to be honest I find this rather complicated, and involved managing lots of classes and instances for the fields and so on. The Apollo team have developed a much better way to simplify this by creating [graphql-tools](https://github.com/apollographql/graphql-tools). Basically, it allows you to use the [GraphQL schema language](http://graphql.org/learn/schema/#type-language) together with a resolver map to build an instance of GraphQLSchema.

We can define the schema by creating a simple string as follows:

```js
const typeDefs = `
  type Query {
    helloWorld: String!
  }

  schema {
    query: Query
  }
`
```

First, we define a basic type called Query. Later, we identify this as being the Root Query type, meaning it's fields are queryable at the top level of the schema - in this case, the `helloWorld` field, which resolves to a string.

Then you define resolvers as a nested object that maps type and field names to resolver functions:

```js
const resolvers = {
  Query: {
    helloWorld: () => 'Hello!'
  }
}
```

Finally, you combine the schema and the resolvers into an *executable schema* using `makeExecutableSchema` helper:

```js
import { makeExecutableSchema } from 'graphql-tools'

const schema = makeExecutableSchema({ typeDefs, resolvers })
```
For the sake of simplicity we'll keep all of the above code in the same file, called `schema.js`, which will look as this:

```js
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  type Query {
    helloWorld: String!
  }

  schema {
    query: Query
  }
`

const resolvers = {
  Query: {
    helloWorld: () => 'Hello!'
  }
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })
```

> Apollo has a documentation section on [modularizing the schema](http://dev.apollodata.com/tools/graphql-tools/generate-schema.html#modularizing). I've also worked on the subject and created a project which might be useful, though it is in early stages: [graphql-modules](https://github.com/lucasconstantino/graphql-modules).

### Executing queries

After we've managed to create an executable schema, we can resolve queries against it using the official *graphql-js* project as follows:

```js
import { graphql } from 'graphql'
import { schema } from './schema'

const query = '{ helloWorld }'

graphql(schema, query).then(result => {
  // Prints
  // {
  //   data: { helloWorld: "Hello!" }
  // }
  console.log(result)
})
```

As you can see, we first import the schema as defined in the previous steps, then create a simple query, and run it against the schema using a helper from the *graphql* project. Done! We can resolve GraphQL.

> I invite you to now access the code reference on [Github](https://github.com/lucasconstantino/graphql-apollo-rest-wrap), where you'll be able to run the code created so far. Checkout to tag *1-hello-world* to see this check point.

### Resolving using REST API calls

To keep up with simplicity, I'll use an online fake REST API called [JSONPlaceholder](https://jsonplaceholder.typicode.com/). It has a rough blog schema, with posts, users, comments etc, which is just perfect for our use case.

First of all, let's update our schema to define these new types.	We'll add the Post type first, together with a `posts` resolver which will initially resolve to all posts. It goes like this:

```js
const typeDefs = `
  type Post {
    id: Int!
    title: String
    body: String
  }

  type Query {
    posts: [Post]!
  }

  schema {
    query: Query
  }
`
```

Now, we'll update the resolver as follows:

```js
const resolvers = {
  Query: {
    posts: () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
  }
}
```

> Note that we are using [Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API) here. You can polyfill that using [whatwg-fetch](https://github.com/github/fetch), which I've already added to the code reference for this post.

No we can query posts:

```js
import { graphql } from 'graphql'
import { schema } from './schema'

const query = '{ posts { id, title, body } }'

// Prints
// {
//   data: { helloWorld: "Hello!" }
// }
graphql(schema, query).then(console.log)
```

> Checkpoint: go see git tag *2-posts-resolver* on the code reference repository.

Ok, that's pretty cool. What if we wanted to get a single post from the API, though? Well, easy enough. Here is our additions to the schema:

```diff
   type Query {
     posts: [Post]!
+    post (id: Int!): Post
   }

...

 const resolvers = {
   Query: {
+    post: (root, { id }) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).
     posts: () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.j
   }
 }

```

This is a rather interesting addition, for this is the first time we are using variables here. To query a post, say, with `id = 1`, we can execute the following query:

```js
const query = `
  {
    post (id: 1) {
      id
      title
      body
    }
  }
`
```

> Time for another checkpoint: *3-post-resolver*.

Now, having a look at our [mocked API](https://jsonplaceholder.typicode.com/posts/) for posts, we can see that it returns yet a fourth property on each post object: the `userId`. That's a good time for...

### Resolving relations

Relations in GraphQL are simply more field resolvers, as I expect you already know. I'll go further and add the User type and the Post's author field to the schema before altering the resolvers map. I'll just keep pasting the diffs here now for the files are becoming bigger and bigger:

```diff
   type Post {
     id: Int!
	 title: String
     body: String
+    author: User!
+  }
+ 
+  type User {
+    id: Int!
+    username: String
+    email: String
+  }
+
   type Query {
     posts: [Post]!
     post (id: Int!): Post

```

> Small side note: our mocked API returns much, much more fields on the user. But really, we don't need what we don't need, right?

Ok, now things are becoming really interesting. What if we wan't to fetch post id 1, but bring together it's author's data? The query is simple enough in GraphQL, we all know that:

```js
const query = `
  {
    post (id: 1) {
      id
      title
      body
      author {
        id
        username
        email
      }
    }
  }
`
```

But how about the resolver? Well, no more ... Here is how our resolvers need to look like:

```js
const resolvers = {
  Query: {
    post: (root, { id }) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json()),
    posts: () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
  },
  Post: {
    author: ({ userId }) => fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res => res.json()),
  }
}
```

> And of course, a another checkpoint: *4-author-resolver*.

Oooh, that's truly amazing! I'll just take break for a coffee and contemplate such good work...

### Mutations, now! Come on!

No need. Mutations in GraphQL are just more field resolver, really, with some additional behavior which alter not much of what we've covered so far. I won't go through this matter here, but we still got some things to talk about.

## Apollo Client

Ok, I know that running a static query stored in a variable in the *index.js* of our application isn't going to help us that much. The next step is integrating what we already have with [Apollo Client](https://github.com/apollographql/apollo-client) ("*The fully-featured, production ready caching GraphQL client for every server or UI framework*". Again: long description, not modest, but quite accurate).

### Installation

```sh
yarn add apollo-client graphql-tag
```

### Creating the client

To create an Apollo Client instance you must instantiate the ApolloClient class with a configuration object containing, at least, the *network interface* which the client will use to make GraphQL requests. Usually, in a front-end/back-end application this means using the included helper *createNetworkInterface*, which would basically send POST requests to a backend on the same domain of the running application. This looks pretty much like this:

```js
import ApolloClient, { createNetworkInterface } from 'apollo-client'

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://graphql.example.com',
  }),
})
```

And, to perform a query, something like this:

```js

```

> If you are interested, you can find out more on the [Network layer](http://dev.apollodata.com/core/network.html) of the Apollo Client,

We are out of luck here, though, as it was said that all we have is a REST API endpoint, not something that could resolve our GraphQL POST requests. Good enough we've being building our own wrap around the REST API just earlier in this post. What we are going to do here, though, is no easy game. Check this out:

```js
import ApolloClient, { printAST } from 'apollo-client'
import { graphql } from 'graphql'
import { schema } from './schema'

export const client = new ApolloClient({
  networkInterface: {
    query: req => {
      const query = printAST(req.query)
      const { operationName, variables = {} } = req

      return graphql(schema, query, null, null, variables, operationName)
    }
  }
})
```

Ok, what the heck is going on here?

First, we are instantiating ApolloClient with a completely custom *networkInterface*. It consists of the sole required method *query*, which will be called by the client to resolve queries. This method will be called with a single argument; a ApolloClient [Request Interface](https://github.com/apollographql/apollo-client/blob/master/src/transport/networkInterface.ts#L32) instance.

Second, we use an available helper, *printAST*, to process this request object back into a valid GraphQL query string (much similar to the ones we were statically using before).

Third, we extract other import things from this request object, such as an [operationName](http://graphql.org/learn/queries/#operation-name) and possible [variables](http://graphql.org/learn/queries/#variables) to resolve the query with.

Last but not least (always wanted to use this expression...), we run the resolver as were we doing before, passing it the schema, the query, the initial root (top level root, forget it for now if you don't know what it means), a context (null here, for we don't need it), the variables, and the operation name. Most of the arguments are not mandatory, as we've seen this same function be executed with only the first two just some minutes ago.

![Trump is just amazed](https://m.popkey.co/5ea88b/LlVA6.gif)

> If you have any question about this last part, have a look at GraphQL official documentation on [query execution](http://graphql.org/learn/execution/).

We can now use the client as we normally would:

```js
import { client } from './client'
import gql from 'graphql-tag'

const query = gql`
  query Post ($id: Int!) {
    post (id: $id) {
      id
      title
      body
      author {
        id
        username
        email
      }
    }
  }
`

client.query({ query, variables: { id: 1 } }).then(console.log)
```

> Time for another checkpoint: *5-apollo-client*.

## Conclusion

This is pretty much it. I hope you all found your way in this journey of dark GraphQL learning, and above all, I hope you are now able to start using GraphQL today, no more excuses allowed.

#### Post credit scene

Ok, if you are really just starting with GraphQL you might not even know what to do with this "client" we've ended up with. Our *index.js* is still just static resolving of a single query. My bad. I understand that if you are here, you probably do already use React, Angular, or even Vue (but only if you are a true hipster). If that's the case, here are the libraries you are looking for:

https://github.com/apollographql/react-apollo
https://github.com/apollographql/apollo-angular
https://github.com/Akryum/vue-apollo

See ya!