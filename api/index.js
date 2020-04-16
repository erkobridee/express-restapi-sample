// https://expressjs.com/en/4x/api.html#router
const express = require('express');

const extractPageInfoRouter = require('./extract-page-info');

const geoIpInfoRouter = require('./geo-ip-info');

const router = express.Router();

router.use('/extract-page-info', extractPageInfoRouter);

router.use('/geo-ip-info', geoIpInfoRouter);

router.get('/', (req, res) => {
  res.json({ message: 'Hello Express app!' });
});

module.exports = router;