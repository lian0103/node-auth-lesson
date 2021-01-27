const { Router } = require("express");
const authControllers = require("../controllers/authControllers");
const infoControllers = require("../controllers/infoControllers");

const router = Router();

router.get("/signup", authControllers.signup_get);
router.post("/signup", authControllers.signup_post);
router.get("/login", authControllers.login_get);
router.post("/login", authControllers.login_post);
router.get("/logout", authControllers.logout_get);

router.get("/getUser", infoControllers.getUser);

module.exports = router;
