import express from "express";
import cors from "cors";

import connectDB from "./db/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import requestBookRoutes from "./routes/requestBookRoutes.js"

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Server Running...");
});


app.use("/api", studentRoutes);
app.use("/api", bookRoutes);
app.use("/api", requestBookRoutes);





const PORT = 2700;

app.listen(PORT, () => {
  console.log(`🚀 Server Running On Port ${PORT}`);
});
