import {gql} from 'apollo-angular'

const GET_ALL_USER = gql`
  query {
    getAllUsers {
      id
      name
      email
    }
  }
`

const CREATE_USER = gql`
mutation createUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
        actionStatus, message
    }
  }
    `

const UPDATE_USER = gql`
mutation updateUser($name: String!, $email: String!, $id: ID!) {
  updateUser(name: $name, email: $email, id: $id) {
        actionStatus, message
    }
  }
  `

const DELETE_USER = gql`
    mutation deleteUser($id: ID!){
        deleteUser(id: $id){
            actionStatus, message
        }
    }`



const GET_USER = gql`
  query getUser($id: ID!){
    getUser(id: $id) {
      id
      name
      email
    }
  }
`



export {GET_ALL_USER, CREATE_USER, DELETE_USER,GET_USER,UPDATE_USER}