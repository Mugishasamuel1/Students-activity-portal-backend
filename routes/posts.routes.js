const express = require("express");
const {
  addPost,
  getAllPosts,
  getOnePost,
  likePost,
  updatePost,
  deletePost,
  dislikePost,
} = require("../controllers/posts.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/add", protect, addPost);
router.get("/", getAllPosts);
router.post("/:postId/like", protect, likePost);
router.post("/:postId/dislike", protect, dislikePost);
router.get("/:postId", getOnePost);
router.put("/:postId/update", updatePost);
router.delete("/:postId/delete", deletePost);

module.exports = router;
