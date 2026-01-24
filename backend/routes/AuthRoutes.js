
const express = require("express");
const router = express.Router();
const {getDetails, checkDetails, verifyToken } = require("../controllers/AuthController");



router.post('/register', getDetails)
router.post("/login", checkDetails);
// -------------------------------------------------------COOKIE---------------------------------------------------
// router.post('/logout')


// STEP 2
// -----------------------------------------COOKIE OR LOCALSTORAGE-------------------------------------------------------------
router.get("/dashboard", verifyToken, (req, res) => {
  res.json({ Status: "Success", name: req.user.name });
});
// ------------------------------------------------------------------------------------------------------

module.exports = router;
