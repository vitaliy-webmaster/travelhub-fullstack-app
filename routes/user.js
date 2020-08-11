const express = require('express');

const authController = require('../controllers/auth');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/me', authController.isAuthenticated, userController.getAuthUser);
router.get('/:userId', userController.getUser);
router.patch(
  '/:userId',
  authController.isAuthenticated,
  userController.updateUser
);
router.delete(
  '/:userId',
  authController.isAuthenticated,
  userController.deleteUser
);

module.exports = router;
