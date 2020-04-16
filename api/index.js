// https://expressjs.com/en/4x/api.html#router
const express = require('express');

const geoIpInfoRouter = require('./geo-ip-info');

const router = express.Router();

router.use('/geo-ip-info', geoIpInfoRouter);

router.get('/', (req, res) => {
  res.json({ message: 'Hello Express app!' });
});

module.exports = router;