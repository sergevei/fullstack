const express = require('express');
const router = express.Router();

// @route   api/posts/test
// @desc    Test page
// @access  Public 
router.get("/test" , (req , res)=>res.json({msg:"test posts"}));

module.exports = router;