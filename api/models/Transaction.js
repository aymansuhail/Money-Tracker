import { mongoose } from "mongoose";
const { Schema, model } = mongoose;
const TransactionSchema = new Schema({
   name : {type : String, required : true },
   desc : {type : String, required : true },
   price : {type : Number, required : true },
   datetime : {type : Date, required : true },
})
 
export const TransactionModel = model('Transaction', TransactionSchema);