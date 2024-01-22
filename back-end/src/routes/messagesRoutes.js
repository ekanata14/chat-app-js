const express = require('express');
const router = express.Router();
const MessagesController = require('../controller/MessagesController');

router.get('/', MessagesController.getAllMessages);

router.get('/:id', MessagesController.getMessageById);

router.get('/:senderId/:receiverId', MessagesController.getMessagesByUser);

router.post('/', MessagesController.createMessage);

router.put('/:id', MessagesController.updateMessage);

router.delete('/:id', MessagesController.deleteMessage);

module.exports = router;