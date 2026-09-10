import express from "express";
import requestBookModel from "../models/requestBookModel.js";
import bookModel from "../models/bookModel.js";
import studentModel from "../models/studentModel.js";

import issueBookModel from "../models/issueBookModel.js";
import submitBookModel from "../models/submitBookModel.js";

let router = express.Router();

router.post("/requestbook", async (req, res) => {
  let { studentName, studentEmail, bookName, date, status } = req.body;

  try {
    let book = new requestBookModel({
      studentName,
      studentEmail,
      bookName,
      date,
      status,
    });

    await book.save();

   await bookModel.updateOne({name:bookName},{$set:{available:false}})
 

    res.status(201).json({
      success: true,
      message: `${bookName} Book Request Raised successfully`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "not request raised",
    });
  }
});

router.get("/requestbook", async (req, res) => {
  try {
    let data = await requestBookModel.find({});

    if (!data) {
      res.status(401).json({
        success: false,
        message: "Request Book List Not Available",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Request Book List Available",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something Wrong",
    });
  }
});

router.post('/reject', async(req,res)=>{

  let {book}= req.body 

  await bookModel.updateOne({name:book},{$set:{available:true}})
  await requestBookModel.deleteOne({bookName:book})

  
})

 
router.post("/accept", async (req, res) => {
  try {
    const { book, email } = req.body;

    let findBook = await bookModel.findOne({ name: book });
    let student = await studentModel.findOne({ email });
    

      let history= {
        bookName: findBook.name,
        author: findBook.author,
        issueDate: new Date().toDateString(),
        returnDate: null
      }
   
  
    if (!findBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }


    await studentModel.updateOne(
      { email },
      {
        $push: {
          issue: findBook
        },
      }
    );
    await studentModel.updateOne(
      { email },
      {
        $push: {
          submit: history
        },
      }
    );


    await requestBookModel.deleteOne({
      bookName: book,
      studentEmail: email,
    });


    let issuebook = new issueBookModel({
      studentName:student.name,  
      bookName:findBook.name,
      author:findBook.author,
      date:new Date().toDateString()
    
    });

    await issuebook.save();


    res.status(200).json({
      success: true,
      message: "Book issued successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});



router.get('/issuebooks', async(req,res)=>{

   try{

    let data = await issueBookModel.find({})

    res.status(201).json({
      message:"all issue books",
      data: data 
    })

   }catch(err){
    
   }

})
router.get('/submitbooks', async(req,res)=>{

   try{

    let data = await submitBookModel.find({})

    res.status(201).json({
      message:"all issue books",
      data: data 
    })

   }catch(err){

   }

})





export default router;
