import express from "express";
import Products from "./../model/productsModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json(error.errors);
  }
});

router.post("/create", async (req, res) => {
  const { nameProduct, photo, description, rating, phoneNum, recipe } =
    req.body;

  try {
    const newProduct = await Products.create({
      nameProduct,
      photo,
      description,
      rating,
      phoneNum,
      recipe,
    });
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json(error.errors);
    throw new Error(error);
  }
});

export default router;
