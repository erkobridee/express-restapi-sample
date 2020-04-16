// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

const staticPublicOptions = {
	dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
};
app.use(express.static('public', staticPublicOptions))

app.get('/', (req, res) => {
  // res.send('Hello Express app!');
	res.sendfile(__dirname + '/public/index.html');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello Express app!' });
});

app.listen(3000, () => {
  console.log('server started');
});