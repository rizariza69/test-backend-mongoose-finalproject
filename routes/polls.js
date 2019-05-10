const router = require("express").Router();
const Controller = require("../controllers/usersControllers");

router.get("/", Controller.getPolls);

module.exports = router;
