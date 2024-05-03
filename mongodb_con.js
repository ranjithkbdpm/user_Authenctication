import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();


const uri = process.env.MONGODB_URL;

//mongoose.Promise = global.Promise;

//const client = mongoose(uri,{ useNewUrlParser: true, useUnifiedTopology: true});

let isConnected = false;

const openConnection = async() =>{
   try{
     //await mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true,});
     await mongoose.connect(uri);
     console.log('Cluster DB connection is successful');
     isConnected = true;
   }catch(err){
    console.log('Cluster DB connection is unsuccessful', err);
    console.log(err.stack);
   }
}

const closeConnection = async() =>{
    try{
        await mongoose.connection.close();
        console.log('Cluster DB connection closed');
        isConnected = false;
       }catch(err){
        console.log('Cluster DB connection unable to close', err);
        console.log(err.stack);
       }
}

export {isConnected, openConnection, closeConnection};