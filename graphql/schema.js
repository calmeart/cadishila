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

const Joi = require('joi');
const { productSchema, categorySchema } = require('../validation');


const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
    size: { type: new GraphQLList(GraphQLString) },
    imageLink: { type: GraphQLString },
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
    audience: { type: GraphQLString },
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
      args: {audience: {type: GraphQLString}},
      resolve(parent, args) {
        return Category.find({audience: args.audience});
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
        size: { type: new GraphQLList(GraphQLString) },
        categoryId: { type: new GraphQLNonNull(GraphQLString) },
        imageLink: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const { name, description, price, size, categoryId, imageLink } = args;
        try {
          const tempProduct = productSchema.validate({ name, description, price, size, categoryId, imageLink });
          if (tempProduct.error) {
            throw new Error(tempProduct.error.details[0].message);
          }
          return new Product(tempProduct.value).save();
        }
        catch (err) {
          return err;
        }
      }
    },
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        audience: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const { name, audience } = args;
        try {
          const tempCategory = categorySchema.validate({ name, audience });
          if (tempCategory.error) {
            throw new Error(tempCategory.error.details[0].message);
          }
          return new Category(tempCategory.value).save();
        }
        catch (err) {
          return err;
        }

      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationType
});
