const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.xia6m4d.mongodb.net/gofoodMERN?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: false });
    console.log("Connected to MongoDB");
/* ----------------food items--------------------------*/
    const food_item = mongoose.connection.db.collection("food_items");
    const data = await food_item.find({}).toArray();
    // console.log("Fetched Data:", data);
    
/* ----------------food category--------------------------*/

    const foodCategory = mongoose.connection.db.collection("food_categories");
    const catData = await foodCategory.find({}).toArray();
    // console.log("Fetched category Data:", catData);

/* ----------------registration id's--------------------------*/ 

    const registration = mongoose.connection.db.collection("users");
    const regData = await registration.find({}).toArray();
    // console.log("Fetched registration Data:", regData); 

    const image = mongoose.connection.db.collection("submits");
    const imgData = await image.find({}).toArray();
    // console.log("data fetched", imgData);

    // const deleteImage = image.deleteOne({})
    // .then(() => console.log('User deleted'))
    // .catch((err) => console.log(err));

    // const updateImage = image.updateOne({name : 'Shubhra jyotsna Manhar'},  { $set: { name: 'image' } })
    // .then(() => console.log('User updated'))
    // .catch((err) => console.log(err));
    // const deleteReg = await registration.deleteOne({});
    // console.log("data deletion is working", deleteReg)

    
    // const footer = mongoose.connection.db.collection("footer");
    // const getData = await footer.find({}).toArray();
    // console.log("fetched data:", getData)
    // global.footer =getData;
    // global.image= updateImage;
    // global.image= deleteImage
    global.image= imgData;
    global.registration = regData;
    global.food_items = data; // Consider if using global scope is necessary
    global.foodCategory = catData;
  } catch (error) {
    console.error("Error:", error);
  }   
};

module.exports = mongoDB;





// const mongoose = require("mongoose");

// const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.xia6m4d.mongodb.net/gofoodMERN?retryWrites=true&w=majority';
// const mongoURI = "mongodb://gofood:gofood@ac-y0wdeob-shard-00-00.xia6m4d.mongodb.net:27017,ac-y0wdeob-shard-00-01.xia6m4d.mongodb.net:27017,ac-y0wdeob-shard-00-02.xia6m4d.mongodb.net:27017/gofoodMERN?ssl=true&replicaSet=atlas-lvqo2c-shard-0&authSource=admin&retryWrites=true&w=majority";
// const mongoDB = async () => {
//   await mongoose.connect(mongoURI, { useNewUrlParser: true });
//   console.log("connected");

//   const fetched_data = await mongoose.connection.db.collection("food_items");
//   fetched_data.find({}).toArray(function (err, data) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//       global.food_items = data;
//       console.log(global.food_items)
//     }
//   });
// };

// module.exports = mongoDB;
