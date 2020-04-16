// https://ip-api.com/docs/api:json
// https://expressjs.com/en/4x/api.html#router
// https://expressjs.com/en/guide/routing.html#route-parameters

const got = require('got');

const express = require('express');
const router = express.Router();

router.get('/:query', async (req, res) => {
	const { query } = req.params;

	const response = await got(`http://ip-api.com/json/${query}`);

	const { query: queryAttr, status, ...others } = JSON.parse(response.body);

	res.json(others);
});

router.get('/', async (req, res) => {
	res.status(400).send('Bad Request');
});

module.exports = router;