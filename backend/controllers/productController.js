import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";


const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,       
      subCategory,    
      sizes,          
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const productImages = [image1, image2, image3, image4].filter(
      (image) => image !== undefined
    );

    let imageUrls = await Promise.all(
      productImages.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imageUrls,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Item added successfully." });
  } catch (error) {
    console.log("Error while adding item: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log("Error while fetching item: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Item removed successfully." });
  } catch (error) {
    console.log("Error while removing item: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log("Error while fetching item: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, getSingleProduct };
