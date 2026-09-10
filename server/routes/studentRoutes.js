

import express from "express";
import studentModel from "../models/studentModel.js";
import redgNo from "../models/registrationNoModel.js";
import bookModel from "../models/bookModel.js";
import submitBookModel from "../models/submitBookModel.js"
const router = express.Router();

router.post("/addstudents", async (req, res) => {
  try {
    const { name, email, dob, mobile } = req.body;

    const emailExist = await studentModel.findOne({ email });

    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const reg = await redgNo.findOne();

    if (!reg) {
      return res.status(404).json({
        success: false,
        message: "Registration number document not found.",
      });
    }

    const student = new studentModel({
      name: name.toUpperCase(),
      email,
      dob,
      mobile,
      regd_no: reg.registration_no,
      password: dob.split("-").reverse().join(""),
      issue: [],
      submit: [],
    });

    await student.save();

    await redgNo.updateOne({ _id: reg._id }, { $inc: { registration_no: 1 } });

    res.status(201).json({
      success: true,
      message: "Student added successfully.",
      data: student,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/deletestudent", async (req, res) => {
  let { name, email } = req.query;

  // console.log(name, email);

  try {
    await studentModel.deleteOne({ email });

    res.status(201).json({
      success: true,
      message: `Student ${name}  deleted successfully.`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/studentlogin", async (req, res) => {
  let { email, password } = req.body;
  try {
    let exitEmail = await studentModel.findOne({ email });
    if (exitEmail) {
      if (exitEmail.password == password) {
        res.status(200).json({
          success: true,
          message: "Login Success",
          data: exitEmail,
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credential",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/getstudents", async (req, res) => {
  try {
    let allstudents = await studentModel.find({});

    res.status(201).json({
      success: true,
      message: "Fetch all student successfully",
      data: allstudents,
    });
  } catch (err) {
    res.status(500).json({
      success: fasle,
      message: "Something wrong !",
    });
  }
});

router.get("/studentrequestbook", async (req, res) => {
  let { email } = req.query;

  console.log(email);

  let student = await studentModel.findOne({ email });

  res.status(201).json({
    success: true,
    message: "data fetch",
    data: student,
  });
});

router.post("/submitbook", async (req, res) => {
  let { email, book } = req.body;

    let findBook = await bookModel.findOne({ name: book });
      let student = await studentModel.findOne({ email });

  try {
    await studentModel.updateOne(
      { email },
      {
        $pull: {
          issue: { name: book },
        },
      },
    );

    await studentModel.updateOne(
      {
        email,
        "submit.bookName": book,
      },
      {
        $set: {
          "submit.$.returnDate": new Date().toDateString(),
        },
      },
    );

    await bookModel.updateOne({ name: book }, { $set: { available: true } });

     let submitbook = new submitBookModel({
          studentName:student.name,  
          bookName:findBook.name,
          author:findBook.author,
          date:new Date().toDateString()
        
        });
    
        await submitbook.save();


    res.status(201).json({
      success: true,
      message: "submit book",
    });
  } catch (err) {}
});

router.get("/studenthistory", async (req, res) => {
  let { email } = req.query;

  try {
    let student = await studentModel.findOne({ email });

    res.status(201).json({
      success: true,
      message: "student history",
      data: student,
    });
  } catch (err) {}
});

export default router;
