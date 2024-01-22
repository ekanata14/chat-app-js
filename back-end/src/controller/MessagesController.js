const { messages } = require('../../models')

const MessagesController = {
    getAllMessages: async(req, res) => {
        try{
            const resMessages = await messages.findAll();
            res.json(resMessages);
        } catch(error){
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },
    
    getMessageById: async(req, res) => {
        const messageId = req.params.id
        try{
           const message = await messages.findByPk(messageId);
           if(message){
                res.json(message);
           } else{
            res.status(404).send("Message Not Found");
           }
        } catch(error){
            console.error(error);
            res.status(500).send("Internal Server Error");s
        }
    },

    getMessagesByUser: async(req, res) => {
        const senderId = req.params.senderId;
        const receiverId = req.params.receiverId;
        try{
            const resMessages = await(messages.sequelize.query(`SELECT * FROM messages WHERE (senderId = ${senderId} AND receiverId = ${receiverId}) OR (senderId = ${receiverId} AND receiverId = ${senderId}) ORDER BY createdAt`));
            return res.json(resMessages); 
        } catch(error){
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },

    createMessage: async(req, res) => {
        const {senderId, receiverId, content} = req.body;
        try{
            const newMessage = await messages.create({senderId, receiverId, content});
            res.json(newMessage);
        } catch(error){
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    },

    updateMessage: async(req, res) => {
        const messageId = req.params.id;
        const {senderId, receiverId, content} = req.body;
        try{
            const findMessage = await messages.findByPk(messageId);
            if(findMessage){
                await findMessage.update({senderId, receiverId, content});
                res.json(findMessage);        
            } else{
                res.status(404).send("Message Not Found");s
            }
        } catch(error){
            console.error(error);
            res.status(500).send("Internal Server Error");
        } 
    },

    deleteMessage: async(req, res) => {
        const messageId = req.params.id;
        try{
            const findMessage = await messages.findByPk(messageId);
            if(findMessage){
                await findMessage.destroy();
                res.send("Message deleted successfully");
            } else{
                res.status(404).send("Message not found");
            }
        } catch(error){
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = MessagesController;