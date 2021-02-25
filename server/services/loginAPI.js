const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const dbQuery = "SELECT * FROM user WHERE email=?";

module.exports = loginPOST = (req, res) => {
    const { email, password}= req.body.values;

    db.query(
        dbQuery,
        email,
        (err, result) => {
            if (err){
                res.send({ err: err});
            }

            if ( result.length > 0) {
                
                bcrypt.compare(password, result[0].Password, (error, response) => {
                    
                    if(response){
                        req.session.user= result;

                        const id= result[0].id
                        const token= jwt.sign({id}, "jwtSecret",{
                            expiresIn: 300,
                        })
                        req.session.user = result;

                        
                        res.json({auth: true, token: token, result:result});
                    }else{
                        res.json({auth: false, message: "Wrong email/password combination!"});
                    }
                });
            
            } else {
                res.json({auth: false, message:"no user exists"});
            }
        }
    );
};


module.exports= loginGET =  (req, res) => {
    if (req.session.user){
        res.send ({loggedIn: true, user: req.session.user})
    } else{
        res.send({loggedIn: false});
    }
};