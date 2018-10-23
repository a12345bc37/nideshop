const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: 'nideshop',
  prefix: 'nideshop_',
  encoding: 'utf8mb4',
  host: '10.101.40.63',
  port: '3306',
  user: 'root',
  password: '123456@abcefg',
  dateStrings: true
};
//# sourceMappingURL=database.js.map