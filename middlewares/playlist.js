const { Playlist } = require("../models/playlist.model.js")
const getUserPlaylist = async (req, res, next) => {
  try {
    const { user } = req;
    let userPlaylist = await Playlist.findOne({ userId: user._id })
    if (!userPlaylist) {
      userPlaylist = new Playlist({ userId: user._id, playlists: [{name:"watch later",videos:[],active:true}] })
      userPlaylist = await userPlaylist.save()
    } req.playlist = userPlaylist
    next()
  } catch (e) {
    return res.status(500).json({ success: false, message: "Unable to retrive cart details", errorMessage: e.message })
  }
}
const findPlaylistById = (req, res, next, listId) => {
  const { playlists } = req.playlist;
  let list = playlists.find((list) => list._id == listId);

  if (!list) {
    return res.status(500).json({
      success: false,
      message: "Unable to retrive the playlist"
    })
  }
  req.list = list;
  next();
}

module.exports = {getUserPlaylist, findPlaylistById }