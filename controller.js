
const { validationResult } = require('express-validator');
const User = require('./User');
const Task = require('./Task');
const XLSX = require('xlsx');


exports.renderAddUserForm = (req, res) => {
  res.render('index');
};


exports.addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('index', { errors: errors.array() });
  }

  const { name, email, mobile } = req.body;
  await User.query().insert({ name, email, mobile });
  res.redirect('/');
};


exports.renderAddTaskForm = async (req, res) => {
  const users = await User.query();
  res.render('addtask', { users });
};


exports.addTask = async (req, res) => {
  const { userId, taskName, taskType } = req.body;
  await Task.query().insert({ user_id: userId, task_name: taskName, task_type: taskType });
  res.redirect('/add-task');
};


exports.getUserTasks = async (req, res) => {
  const tasks = await Task.query().where('user_id', req.params.userId);
  res.json(tasks);
};


exports.exportToExcel = async (req, res) => {
  const users = await User.query();
  const tasks = await Task.query();

  const userSheet = users.map(user => ({
    ID: user.id,
    Name: user.name,
    Email: user.email,
    Mobile: user.mobile
  }));

  const taskSheet = tasks.map(task => ({
    Task_ID: task.id,
    User_ID: task.user_id,
    Task_Name: task.task_name,
    Task_Type: task.task_type
  }));

  const workbook = XLSX.utils.book_new();
  const userWS = XLSX.utils.json_to_sheet(userSheet);
  const taskWS = XLSX.utils.json_to_sheet(taskSheet);

  XLSX.utils.book_append_sheet(workbook, userWS, 'Users');
  XLSX.utils.book_append_sheet(workbook, taskWS, 'Tasks');

  const filePath = './Users_Tasks.xlsx';
  XLSX.writeFile(workbook, filePath);

  res.download(filePath);
};
