const  Note  = require("../models/note.model.js")


const getUserNote = async (req, res, next) => {
  try {
    const { user } = req;
    let note =  await Note.findOne({ userId: user._id })
    if (!note) {
    let note = new Note({ userId: user._id, userNotes: [] })
    note = await note.save()
    } req.note = note
      next()
  } catch (e) {
    return res.status(500).json({ success: false, message: "Unable to retrive cart details", errorMessage: e.message })
  }
}


module.exports = {getUserNote}