var express = require('express');
var graphqlHTTP = require('express-graphql');
var {buildSchema} = require('graphql');
var path = require('path');

// Construct a schema, using GraphQL language
var schema = buildSchema(`
  type Query {
    hello: String,
    rollDice(numDice: Int!, numSides: Int): [Int],
    user(userId: String): [String]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  rollDice: function ({numDice, numSides}) {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
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
app.use(express.static(path.join(__dirname, 'public')));
app.listen(4000);
console.log('Running the GraphQL server at the localhost:4000/graphql');