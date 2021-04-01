require('dotenv').config();
const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const cors = require('cors');
const path = require('path');

require('./models/connection')();

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(cors());
app.use('/graphql', graphqlHTTP((req, res, graphQLParams) => ({
  schema,
  graphiql: true,
  context: { req }
})));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is working on port ${port}`);
});
