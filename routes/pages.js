const { sendDashboard, sendIndex } = require("../controllers/auth");
const { checkCookiesJWT, checkAuth } = require("../middlewares/auth");


const pagesRouter = require("express").Router();

pagesRouter.get("/admin/**",checkCookiesJWT,checkAuth,sendDashboard);
pagesRouter.get("/", sendIndex);

module.exports = pagesRouter;