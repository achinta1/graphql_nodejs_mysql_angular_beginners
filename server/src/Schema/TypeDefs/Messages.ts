import {GraphQLObjectType, GraphQLString, GraphQLBoolean} from "graphql"

export const MessageType = new GraphQLObjectType({
    name:"Message",
    fields:()=>({
        actionStatus:{type:GraphQLBoolean},
        message:{type:GraphQLString},
    })

});