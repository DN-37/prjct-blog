import express from "express";

import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import { register, login, getMe } from "./controllers/UserController.js";
import checkAuth from "./utils/checkAuth.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post("/auth/login", loginValidation, login);
app.post("/auth/register", registerValidation, register);
app.get("/auth/me", checkAuth, getMe);

//app.get('/post', PostController.getAll);
//app.get('/post/:id', PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
//app.delete('/posts', PostController.remove);
//app.patch('/posts', PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
