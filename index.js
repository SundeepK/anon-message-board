const express = require('express')
const schemas = require('./schemas/message')
const validate = require('./middleware/schemaMiddleware')
const messageService = require('./messageService')
const app = express()
const port = 3000

app.use(express.json());

app.get('/messages', (req, res) => {
  res.json(messageService.list())
})

app.post('/messages', validate(schemas.messagePOST), (req, res) => {
  res.json(req.body);
  messageService.save(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
