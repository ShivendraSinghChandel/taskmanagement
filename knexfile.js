module.exports = {
    client: 'mysql2',
    connection: {
      host: 'localhost', 
      user: 'root', 
      password: '', 
      database: 'task_management', 
    },
    pool: {
      min: 2,
      max: 10,
    },
  };
  