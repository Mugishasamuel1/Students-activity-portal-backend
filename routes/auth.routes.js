const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/joinRequest", joinRequest);
router.post("/withdrawRequest", withdrawRequest);
router.post("/enrollment", enrollment);

module.exports = router;
