const express = require("express");
const router = express.Router();
const loginAPI = require("../services/loginAPI");

router.route("/hamro/login").get(loginGET).post(loginPOST);

module.exports = router;