import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {schema} from "./Schema/index"

import {graphqlHTTP} from "express-graphql"
import cors from 'cors';
import {createConnection} from 'typeorm'


import {Users} from './Entities/Users'


dotenv.config();

const app: Express = express();
const port = process.env.PORT;


const main = async () =>{

  await createConnection({
    type : "mysql",
    database : "graphql-tutorial",
    username : "root1234",
    password :"root1234",
    logging:true,
    synchronize:false,
    entities:[
      Users
    ]
  });
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/graphql", graphqlHTTP({
      schema, 
      graphiql:true
    })
  );


  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server is running');
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });

};

main().catch((err)=>{
  console.log(err);

})






