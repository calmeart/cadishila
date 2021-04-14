const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
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
    createdAt: { type: GraphQLString },
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
    cartContent: { type: new GraphQLList(CartContent) },
    customerDetails: { type: CustomerDetails },
    deliveryDetails: { type: DeliveryDetails },
    createdAt: { type: GraphQLString },
    status: { type: GraphQLString },
    deliveredAt: { type: GraphQLString }
  })
});

const ProductDetails = new GraphQLObjectType({
  name: 'ProductDetails',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
    size: { type: GraphQLString },
    imageLink: { type: GraphQLString }
  })
});

const CartContent = new GraphQLObjectType({
  name: 'CartContent',
  fields: () => ({
    productDetails: { type:ProductDetails },
    count: { type: GraphQLInt }
  })
});

const CustomerDetails = new GraphQLObjectType({
  name: 'CustomerDetails',
  fields: () => ({
    username: { type: GraphQLString },
    email:  { type: GraphQLString },
    phone: { type: GraphQLString },
  })
});

const DeliveryDetails = new GraphQLObjectType({
  name: 'DeliveryDetails',
  fields: () => ({
    city: { type: GraphQLString },
    neighborhood: { type: GraphQLString },
    addressOne: { type: GraphQLString },
    addressTwo: { type: GraphQLString },
    zipCode: { type: GraphQLString }
  })
});

const ProductDetailsInput = new GraphQLInputObjectType({
  name: 'ProductDetailsInput',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
    size: { type: GraphQLString },
    imageLink: { type: GraphQLString }
  })
});

const CartContentInput = new GraphQLInputObjectType({
  name: 'CartContentInput',
  fields: () => ({
    productDetails: { type: ProductDetailsInput },
    count: { type: GraphQLInt }
  })
});

const CustomerDetailsInput = new GraphQLInputObjectType({
  name: 'CustomerDetailsInput',
  fields: () => ({
    username: { type: GraphQLString },
    email:  { type: GraphQLString },
    phone: { type: GraphQLString },
  })
});

const DeliveryDetailsInput = new GraphQLInputObjectType({
  name: 'DeliveryDetailsInput',
  fields: () => ({
    city: { type: GraphQLString },
    neighborhood: { type: GraphQLString },
    addressOne: { type: GraphQLString },
    addressTwo: { type: GraphQLString },
    zipCode: { type: GraphQLString }
  })
});

module.exports = {
  CategoryType,
  OrderType,
  ProductType,
  ReviewType,
  UserType,
  CustomerDetails,
  DeliveryDetails,
  CartContentInput,
  CustomerDetailsInput,
  DeliveryDetailsInput
}
