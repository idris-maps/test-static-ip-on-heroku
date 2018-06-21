const express = require('express')
const bodyParser = require('body-parser')
const url = require('url')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

const ipifyUrl = 'https://api.ipify.org?format=json'
const fixieUrl = url.parse(process.env.FIXIE_URL)
const getServerIp = () => axios.get(ipifyUrl, {
  proxy: { host: fixieUrl.host, port: fixieUrl.port }
})

app.get('/', (req, res) => getServerIp()
  .then(({ip}) => res.status(200).json({ serverIp: ip })))
  .catch(err => res.status(500).json({ err }))

app.listen(port, () => {
  console.log(`Listening on ${port}...`)
})

