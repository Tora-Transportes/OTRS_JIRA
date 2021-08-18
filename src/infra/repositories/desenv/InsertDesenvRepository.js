const { Sql_Conn } = require('../../database/db-configs');
const { logger } = require('../../../utils/logs');

module.exports = new class InsertDesenvRepository {
  async execute(jobs) {
    try {
      return Sql_Conn('INTEGRATION_JIRA_OTRS').insert(jobs);
    } catch (err) {
      logger.error(`InsertDesenvRepository ${err.message}`);
    }
  }
};
