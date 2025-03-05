import express from 'express';

import cors from "cors";
import { mongoDbConnection } from './dbConnection.js';
import { User } from "./schema.js"
import jwt from 'jsonwebtoken'
import VerifyToken from './verifyToken.js';
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5000;

app.post("/signupDetails", async (req,res) => {
    const data = req.body;
    const {name, phoneNumber, email, password } = data;

    try {
       const {user_details} = await mongoDbConnection();
       const existingUser = await user_details.findOne({email});
       console.log(existingUser);

       if (existingUser) {
        console.log("User Already Exists !");
        return res.status(400).json({ message : "User Already Exists !"});
       }

       const newUser = new User({ email, phoneNumber, name, password});

       await user_details.insertOne(newUser);
       console.log("user inserted in to db");
       res.status(200).json({ message: "User Successfully inserted into the db"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "internal server error"});
    }
});

app.post("/signinDetails", async (req,res) => {
    const data = req.body;
    const { email, password} = data;

    try {
      const {user_details} = await mongoDbConnection();
      const user = await user_details.findOne({email});
      console.log(user)

      if(!user) {
        return res.status(400).json({message: "User not in the database"});
      }
      
      if (user.password === password){
        const token = jwt.sign({ email: user.email}, "loveumaa", {
            expiresIn: "2h",
        });
        return res.status(200).json({message: "User in the database", token: token});
      } else {
        return res.status(400).json({message: "User not in the database ! please signup"})
      }

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "internal server error"});
    }
});

app.post("/insertVegetableData", async (req, res) => {
    const dataArray = req.body;
    try {
        
        const {vegetableData_collection} = await mongoDbConnection();
        const insertResults = await Promise.all(
            dataArray.map(async (data) => {
              return await vegetableData_collection.insertOne(data);
        })
        
    );
    console.log(insertResults);
    return res.status(200).json({message: "inserted vegetable data successfully", data: insertResults})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "internal server error"});
    }
});

app.get("/getVegetables", VerifyToken, async (req, res) => {
    try {
        const {vegetableData_collection} = await mongoDbConnection();
        const vegetables= await vegetableData_collection.find({}).toArray();
        console.log(vegetables);
        return res.status(200).json({vegetables: vegetables})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "internal server error"});
    }
})


mongoDbConnection();

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});