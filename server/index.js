const express= require("express");
const cors= require("cors");

const bodyParser= require("body-parser");
const cookieParser= require("cookie-parser");
const session= require("express-session");
const jwt= require('jsonwebtoken')
require("dotenv").config();

const app= express();
app.use(express.json());


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "User_ID",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const loginRouter = require("./routes/login");
app.use(loginRouter);

const registerRouter = require("./routes/register");
app.use(registerRouter);


const verifyJWT= (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token){
        res.send("Yo, we need a token, pls give it to us next time!")
    } else{
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err){
                res.json({auth: false, message:"You failed to authenticate"})
            } else{
                req.userId= decoded.id;
                next();
            }
        }) 
    }
}

app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send("Yo, you are authenticated congo")
})


app.listen(3001, () => {
    console.log("running server");
});

