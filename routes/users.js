const router = require("express").Router();
const Controller = require("../controllers/usersControllers");
const Helpers = require("../helpers/authenticated");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/", Controller.getUser);
router.put("/:id", Helpers.isAuthenticated, Controller.updateUser);
router.delete("/:id", Helpers.isAuthenticated, Controller.deleteUser);

module.exports = router;
