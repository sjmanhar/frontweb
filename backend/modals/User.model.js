const mongoose = require("mongoose")
const { Schema } = mongoose;

const UserSchema = new Schema({


    name: {
        type: String,
        required: true,
        trim: true
    }, 
    

    image: {
        // data: Buffer,
        type: String
    },

    description: {
        type: String
    }
    // username: {
    //     type : String,
    //     required: true,
    //     unique: true,
    //     lowercase: true,
    //     trim : true,
    //     index: true
    // },
    // email: {
    //     type : String,
    //     required: true,
    //     unique: true,
    //     lowercase: true,
    //     trim : true
    // },
    // fullname: {
    //     type : String,
    //     required: true,
    //     trim : true,
    //     index: true
    // },
    // avatar:{
    //     type: String, // cloudinary url
    //     required: true
    // },
    // coverImage:{
    //     type: String, //cloudinary url
    // },
    // watchHistory:[
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Video"
    //     }
    // ],
    // passwoed:{
    //     type : String,
    //     required: [true, ' password is required']
    // },
    // refreshToken:{
    //     type: String
    // }

},
{
    timestamps: true
}
)

module.exports = mongoose.model('submit', UserSchema);