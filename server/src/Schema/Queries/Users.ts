import { GraphQLList,GraphQLID } from "graphql";
import {UserType} from "../TypeDefs/Users"
import {Users} from "../../Entities/Users"

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve() {
        return Users.find();
    }
};

export const GET_USER = {
    type: UserType,
    args:{
        id:{type:GraphQLID},
    },
    async resolve(parent:any, args:any ) {
        const id = args.id;
        return await Users.findOneBy({id:id});
    }
};
