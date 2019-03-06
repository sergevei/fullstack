const express = require('express');
const router = express.Router();

// @route   api/users/test
// @desc    Test page
// @access  Public 

router.get("/test" , (req , res)=>res.json({msg:"test users"}));

module.exports = router;