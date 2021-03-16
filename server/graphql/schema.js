const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
 } = graphql;
const _ = require('lodash');

const Product = require('../models/product-model');
const Category = require('../models/category-model');


const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
    size: {type: GraphQLString },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return Category.findById(parent.categoryId);
      }
    }
  })
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    class: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({categoryId: parent.id})
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
        return Product.findById(args.id)
      }
    },
    category: {
      type: CategoryType,
      args: {id: { type: GraphQLID }},
      resolve(parents, args) {
        //return _.find(collections, { id: args.id })
        return Category.findById(args.id)
      }
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent,args) {
        return Product.find({});
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({})
      }
    }
  }
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        size: {type: new GraphQLNonNull(GraphQLString) },
        categoryId: {type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const tempProduct = new Product({
          name: args.name,
          description: args.description,
          price: args.price,
          size: args.size,
          categoryId: args.categoryId
        });
        return tempProduct.save()
      }
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        class: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const tempCategory = new Category({
          name: args.name,
          class: args.class
        });
        return tempCategory.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationType
});
