// https://ip-api.com/docs/api:json

// https://expressjs.com/en/4x/api.html#router
// https://expressjs.com/en/guide/routing.html#route-parameters

const got = require('got');

const express = require('express');
const router = express.Router();

router.get('/:ip?', async (req, res) => {
	const { ip } = req.params;

	if(!ip) {
		res.status(400).send({ error: 'Bad Request' });
		return;
	}

	const response = await got(`http://ip-api.com/json/${ip}`);

	const { query, status, ...others } = JSON.parse(response.body);

	res.json(others);
});

module.exports = router;