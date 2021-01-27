const express = require('express')
const app = express()
const port = 3001
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serves up html page for proxy server
app.use('/:id', express.static(path.join(__dirname, '../public')));

// Photo Carousel
// gets photo carousel bundle.js
// app.get('/:id/bundles/img_carousel', (req, res) => {
//   axios.get(`http://3.101.61.202:3004/${req.params.id}`)3.101.61.202
//   .then(({ data }) => res.status(200).send(data))
//   .catch((err) => res.status(400).send(err))
// });

// gets img carousel from database
app.get('/api/img_carousel/:id', (req, res) => {
  const { id } = req.params;
  axios.get(`http://3.101.61.202:8080/api/img_carousel/${id}`)
    .then(({ data }) => {
      res.status(200).send(data)
    }).catch((err) => res.status(400).send(err))
});

// Reviews app routes
// app.get('/:id/bundles/reviews', (req, res) => {
//   axios.get(`http://54.215.215.126:3000/${req.params.id}`)
//   .then(({ data }) => res.status(200).send(data))
//   .catch((err) => res.status(400).send(err));
// });

app.get('/api/reviews/:id', (req, res) => {
  axios.get(`http://54.215.215.126:8080/api/reviews/${req.params.id}`)
  .then(({ data }) => {
    res.status(200).send(data)
  }).catch((err) => res.status(400).send(err));
});

// Gallery app routes
// app.get('/:id/bundles/gallery', (req, res) => {
//   axios.get(`http://72.134.126.46:3017/1`)
//   .then(({ data }) => res.status(200).send(data))
//   .catch((err) => res.status(400).send(err));
// });

app.get('/api/galleries/:id', (req, res) => {
  axios.get(`http://72.134.126.46:8080/api/galleries/${req.params.id}`)
  .then(({ data }) => {
    res.status(200).send(data)
  }).catch((err) => res.status(400).send(err));
});

// Checkout app routes
// app.get('/:id/bundles/checkout', (req, res) => {
//   axios.get(`http://34.219.249.230:3010/${req.params.id}`)
//   .then(({ data }) => res.status(200).send(data))
//   .catch((err) => res.status(400).send(err));
// });

app.get('/api/checkout/:id', (req, res) => {
  axios.get(`http://34.219.249.230:8080/api/checkout/${req.params.id}`)
  .then(({ data }) => {
    res.status(200).send(data)
  }).catch((err) => res.status(400).send(err));
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`)
});