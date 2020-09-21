const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { use} = require('../routes/user.routes');
const { find } = require('../models/user');
const userController = {};
const SECRET_KEY = 'secretkey123456';


userController.getUsers = async (req, res) => {
    const users = await User.find().exec();
    res.json(users);
}

userController.addAdmin = async (req, res)=>{
    
    await User.find({identifier: '000000000',name: 'admin', email: 'admin', rol:'admin'}, (err, getAdmin)=>{
        if(err) console.log(err)
        if(getAdmin && getAdmin.length >=1){
           console.log('Exists')
        }else{
            const user = new User({
                identifier: '000000000',
                name: 'admin',
                lastName: 'admin',
                email: 'admin',
                rol: 'admin',
                password: bcrypt.hashSync('admin')
            });
            user.save((err, saved)=>{
                if(err) console.log(err)
                res.json({
                    'status' : 'User saved'
                })
            });
        }
    })
    
}


userController.signup = async (req, res) => {
    const user = new User({
        identifier: req.body.identifier,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        rol: req.body.rol,
        password: bcrypt.hashSync(req.body.password)
    });
    await user.save((err, saved)=>{
        if(err) console.log(err)
        res.json({
            'status' : 'User saved'
        })
    });
    
};

userController.signin = async (req,res,err) =>{
    const userData = { 
        email: req.body.name,
        password: req.body.password 
    } 
   const user = await User.findOne({email: userData.email})
   //name does not exist
   if(!user){ return res.status(401).send({message:'The email does not exist'});
}else{
    const resultPassword = bcrypt.compareSync(userData.password, user.password);
    if(resultPassword){
        const token = jwt.sign({_id: user._id}, SECRET_KEY);
        return res.status(200).json({token, _id: user._id, rol: user.rol}); 
    } else {
        //wrong password
        return res.status(401).send({message:'Wrong Password'});
        }
    }
}

userController.getUser = async (req, res)=>{
    const user = await User.findById(req.params.id);
    res.json(user);
};

userController.editUser = async (req, res) => {
    const { id } = req.params;
    const user = {
        identifier: req.body.identifier,
        name: req.body.name,
        lastName: req.body.lastName,
        rol: req.body.rol
    };
    await User.findByIdAndUpdate(id, {$set: user}, {new: true});
    res.json({status: 'User Updated'});
};



userController.deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({status:'User deleted'})
}; 

module.exports = userController;