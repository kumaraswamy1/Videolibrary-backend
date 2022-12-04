const mongoose = require('mongoose');

const childSchema = new mongoose.Schema(
 {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"},
   notes:[{description: String,active:Boolean}]
  }
);


const notesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  userNotes:[childSchema]
});

const Note = mongoose.model("Note", notesSchema);

module.exports =  Note 