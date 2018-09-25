const { Router } = require("express");
const Generic = require("../controllers/generic");
import User from "../controllers/user";
const JwtCheck = require("../middleware/jwt-check");
const ErrorHandler = require("../middleware/error-handler");
const NotFound = require("../middleware/not-found");

const router = new Router();

router
  .get("/health-check", Generic.healthCheck)
  .get("/generic", Generic.genericGET)
  .post("/generic", Generic.genericPOST)
  .put("/generic", Generic.genericPUT)
  .delete("/generic", Generic.genericDELETE)
  .get("/user", JwtCheck, User.retrieve)
  .put("/user", JwtCheck, User.update)
  .delete("/user", JwtCheck, User.delete)
  .use(ErrorHandler())
  .use(NotFound("Not Found"));

export default router;
