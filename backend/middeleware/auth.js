const jwt=require('jsonwebtoken');
const User=require('../models/User');

const isAuth=async(req,res,next)=>{
    try{
        //token existe???
        const token = req.headers["authorization"];
        if(!token){
            return res.status(400).json({ errors: [{ msg: "NO TOKEN!!!" }]});

        }
        //dans le cas ou il y a un token
        const decode=jwt.verify(token, process.env.SECRETE_KEY);
        //recherchedans DB la personne avec le id du code 
        const foundUser=await User.findOne({ _id: decode.id });
        //le cas ou il n existe pas
        if(!foundUser){
            res.status(400).json({errors:[{msg:"USER NOT FOUND!!"}]});

        }
        //cas ou on a trouvee
        req.user=foundUser;
        next();

    }catch(error){
        res.status(400).json({errors: [{msg: "CAN'T VERIFY!!" }], error});

    }
};
//on doit toujours exporter le module sinon il reste en gris 
module.exports=isAuth