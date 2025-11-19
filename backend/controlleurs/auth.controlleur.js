//controlleur pur faire le sign up  d un nouveau utilisateur
const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.register=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const foundUser=await User.findOne({email});
        if(foundUser){
            return res.status(400).json({errors:[{msg:"email should be unique!"}]});
        }
        //dans le cas ou user n existe pas encore
        //const newUser=new User({name,email,password});
        const saltRound =10;
        const hashPassword=await bcrypt.hash(password,saltRound);
        const newUser=new User({name,email,password:hashPassword});

        await newUser.save();
        const token=jwt.sign({
            id:newUser._id
        },process.env.SECRETE_KEY,
        {expiresIn:"2h"}
    );
        
    res.status(201).json({success:[{msg:"registered successfully!"}],user:newUser,token});
    }catch(error){
        res.status(400).json({errors:[{msg:"could not register the user!"}],error});
    }    
};




//controlleur pour se connecter a son compte
exports.login=async(req,res)=>{
    try{
        //la requete pour se connecter
        const{email,password}=req.body;
        //je verifie est ce que mail existe
        const foundUser=await User.findOne({email});
        //mail n existe pas ou erronee
        if(!foundUser){
            return res.status(404).json({errors:[{msg:"bad credentials!"}]});
        }
        //decryptage du mot de passe
        const checkPassword=await bcrypt.compare(password,foundUser.password);
        if(!checkPassword){
            return res.status(401).json({errors:[{msg:"bad credentials!"}]});
        }
        //token
        const token=jwt.sign({
            id:foundUser._id
        },process.env.SECRETE_KEY,
        {expiresIn:"2h"}
    );
        res.status(200).json({success:[{msg:"logged in successfully!"}],user:foundUser,token});
    }catch(error){
        res.status(400).json({errors:[{msg:"could not login the user!"}],error});
    }
    
};
