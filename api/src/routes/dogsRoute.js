const {
  getAllDogs,
  getDogId,
  postNewDog,
} = require("../controllers/dogController");
const { Router } = require("express");
const { Dog, Temperament } = require("../db");

const router = Router();

router.get("/", getAllDogs);
router.get("/:id", getDogId);
router.post("/", postNewDog);

module.exports = router;
