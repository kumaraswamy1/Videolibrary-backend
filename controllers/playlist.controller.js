


const getPlaylist = (playlist) => {
  playlist.playlists = playlist.playlists.filter((playlist) => playlist.active);

  for (let list of playlist.playlists) {
    list.videos = list.videos.filter((video) => video.active);
  }

  return playlist.playlists;
};

const findPlaylist = async (req, res) => {
  try {
    let { playlist } = req
    let playlistItems = await getPlaylist(playlist);
    res.json({
      success: true,
      playlist: playlistItems
    });
  }
  catch (err) {
    res.status(500).json({ success: false, message: "Not working", errorMessage: err.message })
  }
}


const getActivePlaylistItems = (updatedPlaylist) => {
  updatedPlaylist.playlists = updatedPlaylist.playlists.filter((list) => list.active);

  for (let list of updatedPlaylist.playlists) {
    list.videos = list.videos.filter((video) => video.active);
  }

  return updatedPlaylist;
};
const createPlaylist = async (req, res) => {
  const { name } = req.body;
  let { playlist } = req;
  let playlistExists = playlist.playlists.some((list) => list.name == name && list.active);
  if (playlistExists) {
    res.status(200).json({ success: true, playlist: "playlist already exists" })
  }
  else {
    let newList = [{
      name,
      videos: [],
      active: true,
    }]
    playlist.playlists =
      playlist.playlists.concat(newList);
    let updatedPlaylist = await playlist.save();
   
    res.status(201).json({ success: true, playlist: updatedPlaylist });
  }

};


const getActiveVideos = (list) => {
      list = list.filter((item) => item.active);
 
      return list
}
const getPlaylistVideos = async (req, res) => {
  const { list } = req
  playlistVideos = getActiveVideos(list.videos)
  res.json({ success: true, playlist: playlistVideos });
};


const getVideosInPlaylist = (playlist, listId) => {
  let playlistItem = playlist.playlists.find((list) => list._id == listId && list.active);

  if (!playlistItem) {
    throw Error("Playlist item not found. It may either be deleted or not created");
  }

  return playlistItem;
}

const updatePlaylistVideo = async (req, res) => {
  const { list, playlist } = req;
  const { _id } = req.body;
  let playlistVideos = list.videos.map(item => item._id);

  const videoExists = playlistVideos.some((video) => video == _id)
    for (let listItem of playlist.playlists) {
 
      if (listItem._id == list._id) {
         if (videoExists) {
          for (let video of list.videos) {
            if (video._id == _id) {
              video.active = !video.active;
            }}}
         else {
          listItem.videos.push({ _id, active: true })
          }
    }
  }
  let updatedPlaylist = await playlist.save()
  
  playlistVideos = getVideosInPlaylist(updatedPlaylist, list._id);

  playlistVideos = getActiveVideos(playlistVideos.videos)
 
  res.json({ success: true, playlist: playlistVideos });

}






const deletePlaylist = async (req, res) => {
  const { playlist, list } = req;
  for (let listItem of playlist.playlists) {
    if (listItem._id == list._id) {
      listItem.active = false;
    }
  }
  let updatedPlaylist = await playlist.save();
  updatedPlaylist = getActivePlaylistItems(updatedPlaylist);
  res.json({ success: true, playlist: updatedPlaylist });
}

const deletePlaylistVideo = async (req, res) => {
  const { list, playlist } = req;
  const { _id } = req.body;
  let playlistVideos = list.videos.map(item => item._id);

  const videoExists = playlistVideos.some((video) => video == _id)
    for (let listItem of playlist.playlists) {
 
      if (listItem._id == list._id) {
         if (videoExists) {
          for (let video of list.videos) {
            if (video._id == _id) {
              video.active = false;
                 break;
            }
          }
         }
          }
    }
  
  let updatedPlaylist = await playlist.save()

  playlistVideos = getVideosInPlaylist(updatedPlaylist, list._id);

  playlistVideos = getActiveVideos(playlistVideos.videos)
 
  res.json({ success: true, playlist: playlistVideos });

}



module.exports = { findPlaylist, createPlaylist, getPlaylistVideos, deletePlaylist,  updatePlaylistVideo, getPlaylistVideos,deletePlaylistVideo }