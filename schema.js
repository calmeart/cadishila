const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
const _ = require('lodash');

//dummy data
const products = [
  {"id": "1", "name": "Santa Claus", "price": 60},
  {"id": "2", "name": "Black Purple", "price": 90},
  {"id": "3", "name": "Small Bag", "price": 70},
  {"id": "4", "name": "Plush Appa", "price": 80},
  {"id": "5", "name": "Pink Stretch", "price": 100},
]

const collections = [
  {"id": "1", "name": "dress"},
  {"id": "2", "name": "bag"},
  {"id": "3", "name": "toy"}
]

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
  })
});

const CollectionType = new GraphQLObjectType({
  name: 'Collection',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: {
      type: ProductType,
      args: {id: { type: GraphQLID }},
      resolve(parents, args) {
        return _.find(products, { id: args.id })
      }
    },
    collection: {
      type: CollectionType,
      args: {id: { type: GraphQLID }},
      resolve(parents, args) {
        return _.find(collections, { id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
