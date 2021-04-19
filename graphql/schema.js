const bcrypt = require('bcrypt');
const graphql = require('graphql');
const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
 } = graphql;
const _ = require('lodash');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const Product = require('../models/product-model');
const Category = require('../models/category-model');
const User = require('../models/user-model');
const Review = require('../models/review-model');
const Order = require('../models/order-model');
const { categorySchema, productSchema, userSchema } = require('../validation');
const { CategoryType, OrderType, ProductType, ReviewType, UserType, CartContentInput, CustomerDetailsInput, DeliveryDetailsInput } = require('./typeDefs');

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
        return Category.find({});
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve( parent, args ) {
        return User.find({});
      }
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve( parent, args ) {
        return Order.find({});
      }
    },
    getUserOrders: {
      type: new GraphQLList(OrderType),
      args: { email: { type: GraphQLString }},
      resolve( parent, args ) {
        return Order.find({ 'customerDetails.email': args.email });
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve( parent, args ) {
        return Review.find({});
      }
    },
    productReviews: {
      type: new GraphQLList(ReviewType),
      args: { id: { type: GraphQLID }},
      resolve( parent, args ) {
        return Review.find({ productId: args.productId })
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
        categoryId: { type: new GraphQLNonNull(GraphQLString) },
        imageLink: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const { name, description, price, categoryId, imageLink } = args;
        try {
          const tempProduct = productSchema.validate({ name, description, price, categoryId, imageLink });
          if (tempProduct.error) {
            throw new Error(tempProduct.error.details[0].message);
          }
          tempProduct.value.createdAt = new Date().toISOString();
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
      async resolve(parent, args) {
        const { name, audience } = args;
        try {
          const tempCategory = categorySchema.validate({ name, audience });
          if (tempCategory.error) {
            throw new Error(tempCategory.error.details[0].message);
          }

          const checkName = await Category.findOne({ audience, name });
          console.log(checkName);
          if (checkName) throw new Error('This category already exists')

          tempCategory.value.createdAt = new Date().toISOString();
          return new Category(tempCategory.value).save();
        }
        catch (err) {
          return err;
        }

      }
    },
    editProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        categoryId: { type: new GraphQLNonNull(GraphQLString) },
        imageLink: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve( parents, args ) {
        const { id, name, description, price, categoryId, imageLink } = args;
        try {
          const tempProduct = productSchema.validate({ name, description, price, categoryId, imageLink });
          if (tempProduct.error) {
            throw new Error(tempProduct.error.details[0].message);
          }
          return Product.findByIdAndUpdate(id, { $set: { name, description, price, categoryId, imageLink }});
        }
        catch (err) {
          return err;
        }
      }
    },
    deleteProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID }},
      resolve( parents, args, context ) {

        console.log(context.req.headers);
        const authHeader = context.req.headers.authorization;
        if (authHeader){
          const token = authHeader.split('Bearer ');
          if (token) {
            try {
              const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
              return Product.findByIdAndDelete(args.id)
            }
            catch(err) {
              throw err;
            }
          }
          throw new Error('You are not allowed to use this property');
        }
        throw new Error('Authorization is not provided.')
      }
    },
    deleteCategory: {
      type: CategoryType,
      args: { id: { type: GraphQLID }},
      async resolve( parents, args ) {
        const { id } = args;
        try {
          const foundProduct = await Product.findOne({ categoryId: args.id });
          if (foundProduct) throw new Error('There are products under this category. Please remove all the products before deleting.')

          return Category.findByIdAndDelete(args.id)
        }
        catch(err) {
          return err;
        }
      }
    },
    registerUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve( parent, args ) {
        const { username, password, email } = args;

        try {
          const tempUser = userSchema.validate({username, password, email});
          if (tempUser.error) {
            throw new Error(tempUser.error.details[0].message);
          }

          const checkEmail = await User.findOne({ email });
          if (checkEmail) throw new Error('This email address is already registered');

          const checkUserName = await User.findOne({ username });
          if (checkUserName) throw new Error('This username is already taken');

          const hash = await bcrypt.hash(tempUser.value.password, 12);
          tempUser.value.password = hash;

          tempUser.value.isAdmin = false;
          tempUser.value.isMember = true;

          const user = new User(tempUser.value);
          const res = await user.save();
          const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
          }, process.env.JWT_SECRET_KEY);

          return { ...res._doc, id: res._id, token };
        }
        catch (err) {
          return err;
        }
      }
    },
    loginUser: {
      type: UserType,
      args: {
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve( parent, args ) {
        const { password, email } = args;

        try {
          const user = await User.findOne({email});

          if (!user) throw new Error('there is no account with this email address');
          const checkPassword = await bcrypt.compare(password, user.password);
          if (!checkPassword) throw new Error('password is wrong');

          const token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
          }, process.env.JWT_SECRET_KEY);

          return {...user._doc, id: user._id, token };
        }
        catch (err) {
          return err;
        }
      }
    },
    submitOrder: {
      type: OrderType,
      args: {
        cartContentInput: { type: new GraphQLList(CartContentInput) },
        customerDetails: { type: CustomerDetailsInput },
        deliveryDetails: { type: DeliveryDetailsInput }
      },
      async resolve( parent, args ) {
        const { cartContentInput, customerDetails, deliveryDetails } = args;
        try {
          const newOrder = new Order({
              cartContent: cartContentInput,
              customerDetails,
              deliveryDetails,
              createdAt: new Date().toISOString(),
              status: 'PENDING',
              deliveredAt: 'NOT YET'
          });

          await newOrder.save();
          return newOrder;
        }
        catch(err) {
          console.log(err);
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
