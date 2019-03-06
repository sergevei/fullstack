const express = require('express');
const router = express.Router();

// @route   api/profile/test
// @desc    Test page
// @access  Public 

router.get("/test" , (req , res)=>res.json({msg:"test profile"}));

module.exports = router;