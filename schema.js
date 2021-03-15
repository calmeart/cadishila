const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const _ = require('lodash');

//dummy data

const products = [
  {"id": "1", "name": "Santa Claus", "type": "dress"},
  {"id": "2", "name": "Black Purple", "type": "hat"},
  {"id": "3", "name": "Small Bag", "type": "bag"},
  {"id": "4", "name": "Plush Appa", "type": "toy"},
  {"id": "5", "name": "Pink Stretch", "type": "dress"},
]

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: {
      type: ProductType,
      args: {id: { type: GraphQLString }},
      resolve(parents, args) {
        return _.find(products, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
