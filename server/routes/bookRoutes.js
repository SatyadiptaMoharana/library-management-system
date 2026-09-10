//bookRoutes.js

import express from "express";
import multer from "multer";
import allBooks from "../models/bookModel.js";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/allbooks", upload.single("photo"), async (req, res) => {
  try {
    const { name, author, quantity, description } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Book image is required.",
      });
    }

    const book = new allBooks({
      name,
      author,
      quantity,
      description,
      photo: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      available:true 
    });

    await book.save();

    res.status(201).json({
      success: true,
      message: "Book added successfully.",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/deletebook", async (req, res) => {
  let { name } = req.query;

  // console.log(name, email)

  try {
    await allBooks.deleteOne({ name });

    res.status(201).json({
      success: true,
      message: `book  deleted successfully.`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/getAllBooks", async (req, res) => {
  try {
    let books = await allBooks.find({})
    // console.log(books)

    let allbook= await books.map((obj)=>{
      return {
        _id: obj._id,
        name:obj.name,
        author:obj.author,
        quantity:obj.quantity,
         description: obj.description,
         createdAt:obj.createdAt,
         photo:`data:${obj.photo.contentType};base64,${obj.photo.data.toString('base64')}`,
         available: obj.available
      }
    })



    res.status(201).json({
      success: true,
      message: "Fetch all book successfully",
      data: allbook,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something wrong !",
    });
  }
});

export default router;
