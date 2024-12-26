const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const mainController = require('./controller');

router.get('/', mainController.renderAddUserForm);
router.post('/add-user', [
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('mobile').matches(/^[0-9]{10}$/).withMessage('Please enter a valid mobile number')
], mainController.addUser);

router.get('/add-task', mainController.renderAddTaskForm);
router.post('/add-task', mainController.addTask);
router.get('/tasks/:userId', mainController.getUserTasks);
router.get('/export', mainController.exportToExcel);

module.exports = router;
