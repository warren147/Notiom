import * as mongoDB from "mongodb";
import * as dotenv from "dotenv"; 
import { MongoClient } from "mongodb";
import mongoose from 'mongoose';


dotenv.config();

const uri : string = (process.env.REACT_APP_URI as string)

export async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("connected");
    }catch(error){
        console.error(error);
    }
}

// const client = new mongoDB.MongoClient(uri);

// interface  document{
//   id: number;
//   content: string;
// }

// async function connect() {
//   try {
//     await client.connect();

//     console.log(`Connected`)
//   } finally {
//     await client.close();
//   }
// }

// connect().catch(console.dir);