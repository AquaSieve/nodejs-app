var express = require("express");
var router = express.Router();

import { CameraFeedDataService } from "../services/CameraFeedDataService";

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const result = await CameraFeedDataService.processReceivedFeedData({});
  res.send(result);
});

module.exports = router;
