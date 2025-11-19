const {check,validationResult}=require('express-validator');

exports.registerValidator=()=>[
    check("name","Name is required").not().isEmpty(),
    check("Email","enter a valid email").isEmail(),
    check("password","length of password should be between 6 to 15 caracter").isLength({min:6,max:15}),
];

exports.loginValidator=()=>[
    check("Email","enter a valid email").isEmail(),
    check("password","length of password should be between 6 to 15 caracter").isLength({
        min:6,
        max:15
    }),

];

exports.validation=(req,res,next)=>{
    const errors=validationResult(req);
    errors.isEmpty() ? next() : res.status(400).json({errors:errors.array()});
};

