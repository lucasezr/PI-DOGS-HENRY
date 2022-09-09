const { Router } = require("express");
// Importar todos los routers;
const dogsRoute = require("./dogsRoute");
const tempRoute = require("./temperamentroute");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogsRoute);
router.use("/temperaments", tempRoute);

module.exports = router;
