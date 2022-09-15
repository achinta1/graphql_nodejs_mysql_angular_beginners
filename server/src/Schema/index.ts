import { GraphQLSchema, GraphQLObjectType } from "graphql";
import {GET_ALL_USERS,GET_USER} from "./Queries/Users"
import {CREATE_USER,DELETE_USER,UPDATE_PASSWORD,UPDATE_USER} from "./Mutations/Users"

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        getAllUsers: GET_ALL_USERS,
        getUser: GET_USER,
    },
});

const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createUser : CREATE_USER,
        deleteUser : DELETE_USER,
        updatePassword : UPDATE_PASSWORD,
        updateUser : UPDATE_USER
    },
})


export const schema = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation
});