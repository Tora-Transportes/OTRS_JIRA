const { Sql_Conn } = require('../../database/db-configs');
const { logger } = require('../../../utils/logs');

module.exports = new class GetAllDesenvRepositor {
  async execute() {
    try {
      return Sql_Conn.select('*').from('INTEGRATION_JIRA_OTRS').where({ status_envio: 0 });
    } catch (err) {
      logger.error(`GetAllDesenvRepositor ${err.message}`);
    }
  }
};
