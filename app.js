require('dotenv').config();
const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

require('./models/connection')();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.route("/")
.get((req, res) => {
  res.send('this is working')
});

app.listen(4000, () => {
  console.log('server is working on port 4000');
});
