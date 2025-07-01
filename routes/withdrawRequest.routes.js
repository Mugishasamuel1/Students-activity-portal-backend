const express = require("express");
const { 
    AddwithdrawRequest,
    getAllwithdrawRequests,
    updatewithdrawRequest,
    getOnewithdrawRequest,
    getMywithdrawRequests,
} = require("../controllers/withdrawRequest.controller");
const router = express.Router();

router.post("/", AddwithdrawRequest);
router.get("/", getAllwithdrawRequests);
router.put("/:id", updatewithdrawRequest);
router.get("/:id", getOnewithdrawRequest);
router.get("/my-withdraw-requests", getMywithdrawRequests);

module.exports = router;
// This code defines the routes for handling withdrawal requests in an Express application.
// It includes routes for adding a withdrawal request, getting all withdrawal requests, updating a withdrawal request, getting a specific withdrawal request by ID, and getting the current user's withdrawal requests.