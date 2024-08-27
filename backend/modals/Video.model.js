const mongoose = require('mongoose')
const {Schema} = mongoose

const videoSchema = new Schema(
    {
        videoFile: {
            type: String,
            required: true
        },
        thumbnail:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        duration:{
            type: Number,
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished:{
            type: Boolean,
            default:true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref:'user_model'
        }
        

    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('video', videoSchema);


