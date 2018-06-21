require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const request = require('request')
const ipifyUrl = 'https://api.ipify.org?format=json'


app.use(bodyParser.json())

app.get('/', (req, res) =>
  res.status(200).json({ message: 'The app works' }))

app.get('/not-static', (req, res) => {
  request({
    url: ipifyUrl,
    headers: {
        'User-Agent': 'node.js'
    }
  }, (err, response, body) => res.status(200).json({
    code: response.statusCode,
    body: JSON.parse(body)
  }))
})

app.get('/static', (req, res) => {
  request({
    proxy: process.env.QUOTAGUARDSTATIC_URL,
    url: ipifyUrl,
    headers: {
        'User-Agent': 'node.js'
    }
  }, (err, response, body) => res.status(200).json({
    code: response.statusCode,
    body: JSON.parse(body),
  }))
})

app.listen(port, () => {
  console.log(`Listening on ${port}...`)
})

