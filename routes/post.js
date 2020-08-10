const express = require('express');
const catchAsyncErrors = require('../helpers/catchAsyncErrors');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json('Endpoint works!');
});

module.exports = router;
