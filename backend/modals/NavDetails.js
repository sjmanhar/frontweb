const mongoose = require('mongoose')
const {Schema } = mongoose;

const UserSchema = new Schema({

    logo:{
        type: String    
    },

    links:[
        {
            label: {
                type: String
            },
            url: {
                type : String
            }
        }
    ]
},
{
    timestamps: true
}
)

module.exports = mongoose.model('nav', UserSchema);