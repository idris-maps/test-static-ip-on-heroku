require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const url = require('url')
const app = express()
const port = process.env.PORT || 3000
const request = require('request')
const ipifyUrl = 'https://api.ipify.org?format=json'


const getOptions = (withProxy) => ({
  proxy: withProxy ? process.env.QUOTAGUARDSTATIC_URL : undefined,
  url: ipifyUrl,
  headers: {
      'User-Agent': 'node.js'
  }
})

app.use(bodyParser.json())

app.get('/', (req, res) =>
  res.status(200).json({ message: 'The app works' }))

app.get('/not-static', (req, res) => {
  request(getOptions(false), (err, response, body) => res.status(200).json({
    code: response.statusCode,
    body,
  }))
})

app.get('/static', (req, res) => {
  request(getOptions(true), (err, response, body) => res.status(200).json({
    code: response.statusCode,
    body,
  }))
})

app.listen(port, () => {
  console.log(`Listening on ${port}...`)
})

