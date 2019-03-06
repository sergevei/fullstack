const express = require('express');
const router = express.Router();

// @route   api/users/test
// @desc    Test page
// @access  Public 
<<<<<<< HEAD

=======
>>>>>>> 00efc1323fc1ea7a12c8695ad75bd601aa34fb29
router.get("/test" , (req , res)=>res.json({msg:"test users"}));

module.exports = router;