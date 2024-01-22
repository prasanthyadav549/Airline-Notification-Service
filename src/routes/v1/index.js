const express = require("express");

const { InfoController, EmailController } = require("../../controllers");

const router = express.Router();

router.get("/info", InfoController.info);
// /api/v1/tickets POST
router.post("/tickets", EmailController.createTicket);

module.exports = router;
