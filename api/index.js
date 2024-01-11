import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { TransactionModel } from './models/Transaction.js';
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", function(req,res){
    res.json({
        body : "ok test"
    })
})
app.post("/api/transaction",async function(req,res){
    
    await mongoose.connect("mongodb+srv://Ayman:IgFa1xwa2KyO9SjL@cluster0.dhjgeqb.mongodb.net/")
    const{name,desc,price,datetime} = req.body;
    const transaction = await TransactionModel.create({ name, desc, price, datetime });
    
    res.json(transaction);

})

app.get("/api/transactions", async function(req,res){
   await mongoose.connect("mongodb+srv://Ayman:IgFa1xwa2KyO9SjL@cluster0.dhjgeqb.mongodb.net/")
   const transactions = await TransactionModel.find();
    res.json(transactions)
})
app.listen(4040);