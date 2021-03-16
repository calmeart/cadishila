const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
 } = graphql;
const _ = require('lodash');

//dummy data
const products = [
  {"id": "1", "name": "Santa Claus", "price": 60, "available": 3, "collectionId": "1"},
  {"id": "2", "name": "Black Purple", "price": 90, "available": 3, "collectionId": "1"},
  {"id": "3", "name": "Small Bag", "price": 70, "available": 3, "collectionId": "2"},
  {"id": "4", "name": "Plush Appa", "price": 80, "available": 3, "collectionId": "3"},
  {"id": "5", "name": "Pink Stretch", "price": 100, "available": 3, "collectionId": "1"}
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
    available: { type: GraphQLInt },
    price: { type: GraphQLInt },
    collection: {
      type: CollectionType,
      resolve(parent, args) {
        return _.find(collections, {id: parent.collectionId})
      }
    }
  })
});

const CollectionType = new GraphQLObjectType({
  name: 'Collection',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return _.filter(products, {collectionId: parent.id})
      }
    }
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
