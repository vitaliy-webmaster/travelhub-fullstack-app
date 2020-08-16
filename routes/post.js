const express = require('express');

const authController = require('../controllers/auth');
const postController = require('../controllers/post');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.post('/by-tag', postController.getPostsByTags);
router.get(
  '/my-posts',
  authController.isAuthenticated,
  postController.getAuthUserPosts
);
router.get('/:postId', postController.getPost);
router.post('/', authController.isAuthenticated, postController.addPost);
router.post(
  '/upload-post-preview',
  authController.isAuthenticated,
  postController.multerPostPreview,
  postController.uploadPostPreview
);
router.patch(
  '/:postId',
  authController.isAuthenticated,
  postController.updatePost
);
router.delete(
  '/:postId',
  authController.isAuthenticated,
  postController.deletePost
);
router.put(
  '/:postId/like',
  authController.isAuthenticated,
  postController.likePost
);
router.put(
  '/:postId/unlike',
  authController.isAuthenticated,
  postController.unlikePost
);

module.exports = router;
