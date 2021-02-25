const express = require("express");
const router = express.Router();
const registerAPI = require("../services/registerAPI");

module.exports = router.post("/hamro/register", registerAPI);
