const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  videos: [{ _id: { type: mongoose.Schema.Types.ObjectId, ref: "Video" }, active: Boolean, Date: Date }]
})

const WatchHistory = mongoose.model("WatchHistory", historySchema);

module.exports = WatchHistory;