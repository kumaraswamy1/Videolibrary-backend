const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = Schema(
  {
    title: {
      type: String,

      required: "Cannot enter a video without name, please enter the video name "
    },
    videoId: {
      type: String,
      required: "Cannot enter a video without Id, please enter the video Id"
    },
    thumbnail: {
      type: String,
      required: "Cannot enter a video without thumbnail,please enter the thumbnailUrl of the video"
    }, views:
      Number,
    channelName: {
      type: String,
      required: "Cannot enter a video wihout its Channel name"
    },
channelDisplayPic:{
  type:String,
},
category:{
type:String,
required:"Cannot enter a video without its category"},
    description: {
      type: String,

    }
  }, { timestamps: true }
);


const Video = mongoose.model("videos", videoSchema);




module.exports = { Video }

