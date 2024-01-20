const { users } = require('../../models');

const UserController = {
    getAllUsers: async(req, res) => {
        try{
            const resUsers = await users.findAll();
            res.json(resUsers);
        } catch(error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    getUserById: async(req, res) => {
        const userId = req.params.id;
        try{
            const resUsers = await users.findByPk(userId);
            if(resUsers){
                res.json(resUsers);
            } else{
                res.status(404).send("User not found");
            }
        } catch(error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    createUser: async(req, res) => {
        const {username, password} = req.body;
        try{
            const newUser = await users.create({username, password});
            res.json(newUser);
        } catch(error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    updateUser: async(req, res) => {
        const userId = req.params.id;
        const {username, password} = req.body;
        try{
            const findUser = await users.findByPk(userId);
            if(findUser){
                await findUser.update({username, password});
                res.json(findUser);
            } else{
                res.status(404).send('User not Found');
            } 
        } catch(error){
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    deleteUser: async(req, res) => {
        const userId = req.params.id;
        try{
            const findUser = await users.findByPk(userId);
            if(findUser){
                await findUser.destroy();
                res.send("User deleted successfully");
            } else{
                res.status(404).send("User not found");
            }
        } catch(error){
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
};

module.exports = UserController;
