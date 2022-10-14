import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);

  if (req.body.email == "test@test.ru") {
    const token = jwt.sign(
      {
        email: req.body.email,
        fullName: "John Smith",
      },
      "secret123"
    );
  }

  res.json({
    success: true,
    token,
  });
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
