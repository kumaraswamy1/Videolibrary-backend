

const findUserNote = note => {
  note.userNotes = note.userNotes.map(userNote => {
    userNote.notes = userNote.notes.filter(note => note.active);
    return userNote;
  });
  return note.userNotes;
};
const getUserNotes = async (req, res) => {
  try {
    let { note } = req
    let userNotes = await findUserNote(note)
    res.json({
      success: true,
      userNotes
    })
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
}


const createUserNote = async (req, res) => {
  const { _id, description } = req.body;
  let { note } = req;
  let userNoteExists = note.userNotes.some((list) => list.videoId == _id);

if(userNoteExists){
  let getVideoId =note.userNotes.find((list) => list.videoId == _id)
 
  let newList = {description,active:true}
  getVideoId.notes.push(newList)
   let updatedData= await  note.save()
}

  else {
    note.userNotes.push({ videoId: _id, notes: [{ description, active: true }] });
  
  }
   let userNotes = await note.save()
 userNotes = findUserNote(userNotes)
    res.status(201).json({ success: true, note: userNotes });

};



const deleteUserNote = async (req, res) => {
  const { _id, description  } = req.body;

  let { note } = req;
  let userNoteExists = note.userNotes.some((userNote) => userNote.videoId == _id);

if(userNoteExists){
     let getVideoId =note.userNotes.find((userNote) => userNote.videoId == _id)
 
let noteExists= getVideoId.notes.find(note=>note.description ==description )


 if (noteExists) {
  noteExists.active =false
  }
  
}
 
 let userNotes = await note.save()
 userNotes = findUserNote(userNotes)

    res.status(201).json({ success: true, note: userNotes });

};

const editUserNote = async (req, res) => {
  const { _id, noteId, description } = req.body;
  let { note } = req;

  let userNoteExists = note.userNotes.some(userNote => userNote.videoId == _id);
  if (userNoteExists) {
    let getVideoId = note.userNotes.find(userNote => userNote.videoId == _id);
    let noteExists = getVideoId.notes.find(note => note._id == noteId);
    if (noteExists) {
      noteExists.description = description;
    }
  }

  let userNotes = await note.save();
  userNotes = findUserNote(userNotes);
  res.status(200).json({ success: true, note: userNotes });
};



module.exports = { getUserNotes, createUserNote,deleteUserNote }