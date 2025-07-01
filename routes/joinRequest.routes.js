const express = require("express");
const {
    AddJoinRequest,
    getAllJoinRequests,
    updateJoinRequest,
    getOneJoinRequest,
    getMyJoinRequests,
} = require("../controllers/joinRequest.controller");

const router = express.Router();

router.post("/", AddJoinRequest);
router.get("/", getAllJoinRequests);
router.put("/:id", updateJoinRequest);
router.get("/:id", getOneJoinRequest);
router.get("/my-requests", getMyJoinRequests);

module.exports = router;
// This code defines the routes for handling join requests in an Express application.
// It includes routes for adding a join request, getting all join requests, updating a join request