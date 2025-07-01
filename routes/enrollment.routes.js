const express = require("express");
const { 
    AddEnrollment,
    getAllEnrollments,
    updateEnrollment,
    getOneEnrollment,
    getMyEnrollments,
} = require("../controllers/enrollment.controller");

const router = express.Router();

router.post("/", AddEnrollment);
router.get("/", getAllEnrollments);
router.put("/:id", updateEnrollment);
router.get("/:id", getOneEnrollment);
router.get("/my-enrollments", getMyEnrollments);

module.exports = router;
