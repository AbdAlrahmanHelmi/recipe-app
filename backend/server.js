import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import productsRouter from "./routes/productRout.js";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

server.use("/api/products", productsRouter);
server.use("*", (req, res) => {
  res.json("deploy");
});
mongoose.connect(process.env.MONG_URI, () => {
  console.log("connection to DB");
});

server.listen(process.env.PORT, () => {
  console.log(`connect on port ${process.env.PORT}`);
});
