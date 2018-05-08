import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt
} from 'graphql'

import { User, IUser } from '../models/User'

export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    _id: {
      type: GraphQLString,
      description: 'The id'
    },
    email: {
      type: GraphQLString,
      description: 'The email'
    },
    firstname: {
      type: GraphQLString,
      description: 'The firstname'
    },
    lastname: {
      type: GraphQLString,
      description: 'The lastname'
    }
  })
})

const query = {
  users: {
    type: new GraphQLList(userType),
    args: {
      limit: {
        description: 'limit items in the results',
        type: GraphQLInt
      }
    },
    resolve: (root, { limit }) =>
      User.find()
        .limit(limit)
        .exec()
  },
  userById: {
    type: userType,
    args: {
      id: {
        description: 'find by id',
        type: GraphQLString
      }
    },
    resolve: (root, { id }) => User.findById(id).exec()
  }
}

const mutation = {
  addUser: {
    type: userType,
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      },
      password: {
        type: new GraphQLNonNull(GraphQLString)
      },
      firstname: {
        type: new GraphQLNonNull(GraphQLString)
      },
      lastname: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (obj, { email, password, firstname, lastname }) => {
      const user = new User()
      user.email = email
      user.firstname = firstname
      user.lastname = lastname
      user.setPassword(password)
      return user.save()
    }
  }
}

const subscription = {}

export const UserSchema = {
  query,
  mutation,
  subscription,
  types: [userType]
}
