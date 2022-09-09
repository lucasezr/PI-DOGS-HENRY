const { allTempApi } = require("../controllers/temperamentController");
const { Router } = require("express");

const router = Router();

router.get("/", allTempApi);

module.exports = router;
