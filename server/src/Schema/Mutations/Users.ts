import { GraphQLList,GraphQLString, GraphQLID } from "graphql";
import {Users} from "../../Entities/Users"
import {MessageType} from "../TypeDefs/Messages"

export const CREATE_USER = {
    type: MessageType, //new GraphQLList(UserType),
    args:{
        name:{type:GraphQLString},
        email:{type:GraphQLString}
    },
    async resolve(parent:any, args:any ) {
        const {name, email } = args;
        await Users.insert({name, email});
        return { "actionStatus":true, "message": "Record has been created successfully"};
    }
};

export const DELETE_USER = {
    type: MessageType, 
    args:{
        id:{type:GraphQLID},
    },
    async resolve(parent:any, args:any ) {
        const id = args.id;
        await Users.delete(id);
        return { "actionStatus":true, "message": "Record has been deleted successfully"};
    }
};


export const UPDATE_USER = {
    type: MessageType,
    args:{
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        id:{type:GraphQLID}
    },
    async resolve(parent:any, args:any ) {
        const {name, email, id} = args;
        const user = await Users.findOneBy({id:id});
        if(user){
            user.email=email;
            user.name=name;
            await user.save();
            //.then((resp)=>{
                //console.log("resp::::==>>",resp);
                return { "actionStatus":true, "message": "Record has been updated successfully"};
            // }).catch((err)=>{
            //     throw new Error(err);
            // })
        }
    }
};

export const UPDATE_PASSWORD = {
    type: MessageType,
    args:{
        name:{type:GraphQLString},
        oldPassword:{type:GraphQLString},
        newPassword:{type:GraphQLString}
    },
    async resolve(parent:any, args:any ) {
        const {name, oldPassword, newPassword} = args;
        const user = await Users.findOneBy({name:name});
        const userPassword = user?.password;
        if(userPassword == oldPassword){
            await Users.update({"id":user?.id},{password:newPassword});
            return { "actionStatus":true, "message": "Record has been updated successfully"};
        }else{
            throw new Error("Password do not match!")
        }
    }
};
