# graphql-sample-demo

This is demo project where we will try to understand how it will work on both front-end and back-end.

In the folder public, we will see how to query from client side using fetch :

for example without parameter:

<pre>
  method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "{ hello }"})
  })
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
    
   
   
</pre>

for example with parameter:

<pre>
var userId = '001';
var query = `query User($userId: String!) {
  user(userId: $userId)
}`;

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { userId },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data))
</pre>


In server side - we need to a schema that define query type and we need a api root with a function called a "Resolver" for each API end point.

<pre>
// Construct a schema, using GraphQL language
var schema = buildSchema(`
  type Query {
    hello: String,
    user(userId: String): [String]
  }
`);
</pre>

<pre>
var root = {
  hello: () => {
    return 'Hello world!';
  },
  user: function ({userId}) {
    return [userId];
  }
};

// create the server for endpoint

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
</pre>