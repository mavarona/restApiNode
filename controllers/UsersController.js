const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

exports.register = async (req, res) => {

    const user = new Users(req.body);
    user.password = await bcrypt.hash(req.body.password, 12);
    try{
        await user.save();
        res.json({message: 'Usuario registrado'});
    } catch( err) {
        console.log(err);
        res.json({message: 'Hubo un error al registrar un usuario'});
    }
}

exports.login = async (req, res, next) => {

    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if(!user){
        await res.status(401).json({message:'El usuario no existe'});
        next();
    } else{
        if(!bcrypt.compareSync(password, user.password)){
            await res.status(401).json({message:'el usuario o el password no son correctos'});
            next();
        }else{
            const token = jwt.sign({
                email: user.email,
                name: user.name,
                id: user._id
            },
            'SECRETKEY',
            {
                expiresIn: '1h'
            });
            res.json({token});
        }
    }
    
}