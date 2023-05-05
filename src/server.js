const express = require('express')
const schemas = require('./schemas/message')
const validate = require('./middleware/schemaMiddleware')
const messageService = require('./services/messageService')
const app = express()
const port = 3000

app.use(express.json());

app.get('/api/messages', messageService.listMessages)

app.post('/api/messages', validate(schemas.messagePOST), messageService.saveMessage)

app.post('/api/messages/:messageId/reply', validate(schemas.messagePOST), messageService.saveMessageReply)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
