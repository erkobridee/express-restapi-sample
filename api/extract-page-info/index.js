// https://expressjs.com/en/4x/api.html#router
// https://expressjs.com/en/guide/routing.html#route-parameters
// https://expressjs.com/en/4x/api.html#req.body

const express = require('express');
const router = express.Router();

const { isURL, extractPageInfo } = require('./utils');

router.get('/', async (req, res) => {
	const { url } = req.query;

	if(!url) {
		res.status(400).send({ error: 'query url is not defined' });
		return;
	}

	if(!isURL(url)) {
		res.status(400).send({ error: 'is not a valid url' });
		return;
	}

	res.send(await extractPageInfo(url));
});

router.post('/', async (req, res) => {
	const { url } = req.body;

		if(!url) {
		res.status(400).send({ error: 'url is not present on the request body' });
		return;
	}

	if(!isURL(url)) {
		res.status(400).send({ error: 'is not a valid url' });
		return;
	}

	res.send(await extractPageInfo(url));
})

module.exports = router;