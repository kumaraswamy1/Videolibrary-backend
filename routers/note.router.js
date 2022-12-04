const express = require("express");
const userNotesRouter = express.Router();
const {getUserNote }= require("../middlewares/note.js")
const{ getUserNotes,createUserNote,deleteUserNote}= require("../controllers/notes.controller.js");

userNotesRouter.use(getUserNote)
userNotesRouter
  .get("/", getUserNotes)
.post("/",createUserNote)
.post("/remove",deleteUserNote)
 

module.exports = userNotesRouter