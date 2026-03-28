import express from "express";
import "./configs/database.js";
import bookModel from "./models/bookModel.js";
import validation from "./middlewares/validation.js";
import { validationResult } from "express-validator";

const app = express();
const port = 3200;
app.use(express.json());

app.get("/", async (req, res) => {
  const data = await bookModel.find({});
  return res.json(data);
});
app.get("/api",async(req,res)=>{
  const search=req.query.search || '';
  const page=req.query.page || 1;
  const limit=req.query.limit || 5;
  const skip=(page - 1)* limit;
  const data=await bookModel.find({bookname:{$regex:search,$options:'i'}})
  .skip(skip).limit(limit)
  .sort({bookname : 1})
  res.json(data)
})
app.post("/add", validation, async (req, res) => {
  const errors = validationResult(req);
  console.log(errors.array())
  if (!errors.isEmpty()) {
    return res.json({
      errors: errors.array()
    });
  } 
  else {
    const data = await bookModel.create(req.body);

    return res.json({
      message: "data added :)",
      info: data,
    });
  }
});
app.listen(port, (error) => {
  if (error) {
    console.log({ error: error.message });
  } else {
    console.log("server start...");
    console.log("http://localhost:" + port);
  }
});
