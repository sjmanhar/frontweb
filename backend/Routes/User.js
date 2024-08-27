const router = require('express').Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const User = require('../modals/User.model');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Images");
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let upload = multer({ storage, fileFilter });

router.post('/submit', upload.single('image'), (req, res) => {
    try {
        console.log(req);
        const name = req.body.name;
        const image = req.file.filename;
        

        const newUserData = {
            name,
            image
        };

        const newUser = new User(newUserData);

        newUser.save()
            .then(() => res.json('User Added'))
            // console.log(global.image)
            // .catch(err => res.status(400).json('Error: ' + err));
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
});

router.get('/display', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
});


router.delete('/delete-img/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            message: 'deleted',
        });
        // console.log('data deleted')
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message,
        });
    }
});

router.put('/update-data/:id',upload.single('image'), async (req,res)=> {
    try{
        const name = req.body.name;
        const image = req.file ? req.file.filename: null;
        
        const updateData = await User.findByIdAndUpdate({ _id : req.params.id}, {$set: {name , image}}, {new: true});
        res.status(200).json({ updateData, success: "Post Updated Sucessfully" });

    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message,
        });
        console.log(err)
    }
})



module.exports = router;

