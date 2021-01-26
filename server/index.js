const express = require('express')
const app = express()
const port = 3001
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/:id', express.static(path.join(__dirname, '../public')));
// serves up html page

app.get('/:id/bundles', (req, res) => {
  axios.get(`http://localhost:3004/${req.params.id}`)
  .then(({ data }) => res.status(200).send(data))
  .catch((err) => res.status(400).send(err))
});
// gets img carousel bundle.js

app.get('/api/img_carousel/:id', (req, res) => {
  const { id } = req.params;
  console.log('pinging img server')
  axios.get(`http://localhost:3004/api/img_carousel/${id}`)
    .then(({data}) => {
      res.status(200).send(data)
    }).catch((err) => res.status(400).send(err))
});
// gets img carousel data from the database

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`)
})