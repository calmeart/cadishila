const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
 } = graphql;

const Product = require('../models/product-model');
const Category = require('../models/category-model');
const User = require('../models/user-model');
const Review = require('../models/review-model');
const Order = require('../models/order-model');

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
    },
    reviews: {
      type: ReviewType,
      resolve( parent, args ) {
        return Review.find({ productId: parent.id });
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

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password:  { type: GraphQLString },
    email: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    isMember: { type: GraphQLBoolean },
    token: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve( parent, args ) {
        return Product.find({userId: parent.id});
      }
    }
  })
});

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    productId: { type: GraphQLID },
    reviewBody: { type: GraphQLString },
    score: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLString }
  })
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    productName: { type: GraphQLString },
    productSize: { type: GraphQLString },
    productPrice: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    deliveryMethod: { type: GraphQLString },
    deliveryAddress: { type: GraphQLString },
    userId: { type: GraphQLID },
    status: { type: GraphQLString },
    deliveredAt: { type: GraphQLString }
  })
});

module.exports = {
  ProductType,
  CategoryType,
  UserType,
  ReviewType,
  OrderType
}
