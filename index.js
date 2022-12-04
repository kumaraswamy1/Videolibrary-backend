const express = require('express');

const app = express();
const bodyParser = require('body-parser')
var cors = require('cors');
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}


app.use(cors(corsOptions));
app.use(express.json());
const { intialDbConnection } = require("./db/db.connect.js")
intialDbConnection()

const videosRouter = require("./routers/videos.router")
const userRouter = require("./routers/user.router")
const playlistRouter = require("./routers/playlist.router")
const likedVideoRouter = require("./routers/likedVideo.router")
const watchHistoryRouter = require("./routers/watchHistory.router")
const authentication = require("./middlewares/authentication");
const userNotesRouter = require("./routers/note.router")

app.use('/user', userRouter)
app.use('/videos', videosRouter)
app.use('/playlists', authentication, playlistRouter)
app.use('/watchHistory', authentication, watchHistoryRouter)
app.use('/likedVideos', authentication, likedVideoRouter)
app.use('/notes', authentication, userNotesRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(404).json({ success: false, message: "page not found", errorMessage: err.message })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: "page not found", errorMessage: err.message })
})


app.listen(3000, () => {
  console.log('server started');
});




