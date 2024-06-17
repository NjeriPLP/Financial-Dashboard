const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  try {
    const data = await Data.find({ symbol });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
