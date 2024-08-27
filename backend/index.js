const express = require('express');
const mongoDB = require('./db');
const cors = require('cors');
const cookieParser =require('cookie-parser');
// const multer = require('multer');

// const User = require('./modals/User');


const app = express();
const port = 5000;
app.use(cors());
// app.use(cors({
//     origin: port.CORS_ORIGIN,
//     credentials: true
// }))

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})


mongoDB();

app.get("/", (req, res) => {
    res.send("hello");
});
app.use(express.json()) //app.use(express.json({limit:"16kb  constant "}))

app.use(express.urlencoded({extended:true, limit: "16kb"}))

app.use('/Images',express.static("Images"));

app.use(cookieParser())

app.use('/api', require("./Routes/CreateUser")) ;
app.use('/api', require("./Routes/DisplayData")) ;
app.use('/api', require("./Routes/OrderData")) ;

// app.use(express.static(path.join(_dirname, 'images')));

app.use('/api', require("./Routes/User") );




app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});


