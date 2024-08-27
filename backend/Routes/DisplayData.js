const express = require('express');
const User = require('../modals/User');
const router = express.Router()

router.post('/foodData', (req,res)=>{
    try {
        // console.log(global.food_items)
        // console.log( global.foodCategory)
        res.send([global.food_items, global.foodCategory])
    } catch (error) {
        console.error(error.message);
        res.send("server error")
    }
})


router.post('/registrations', (req, res) => {
  try {
    res.send([global.registration])
    // const register = User.find({});
    // console.log(register)     
    // res.json(register);
  } catch (error) {
    console.error(error);
    res.send('Internal Server Error');
  }
});

// router.delete('/registrations', (req, res) => {
//   try {
//     res.send([])
//   }catch(error){
//     console.log("error occured", error)
//   }
// });

router.delete('/registrations/:id', async (req, res) => {
  

  try {
    const deletedRegistration = await User.findByIdAndDelete(req.params.id);

    if (!deletedRegistration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    res.json({ success: true, message: 'Registration deleted successfully' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ success: false, message: 'Error deleting registration' });
  }
});


module.exports = router;