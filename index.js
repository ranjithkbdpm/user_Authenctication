import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {openConnection, isConnected, closeConnection} from './mongodb_con.js'
import cookieParser from 'cookie-parser';
import router from './Routes/router.js';
import mongoose from 'mongoose';
const app = express();
//const PORT = process.env.PORT || 4000;
const PORT = 4000;
dotenv.config();

const uri = process.env.MONGODB_URL;

app.use(cors({
    origin:["http://localhost:4000"],
    method:["GET","PUT","POST","PATCH","DELETE"],
    credentials:true
}));

app.use(express.json()); //parse incoming JSON HTTP req 

app.use(cookieParser());//parse the cookie req

mongoose.connect(uri).then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));


// app.get('/', async (req,res)=>{
//     try{
//         if(!isConnected){
//             await openConnection();
//             console.log('DB connection to server is connected')
//             res.send('server is running');
//         }
//     }
//     catch(err){
//         console.log('connection not made to server', err);
//     }      
// });


app.use('/auth',router);


app.listen(PORT, ()=>{
    console.log(`Server is listening to ${PORT}`);
});