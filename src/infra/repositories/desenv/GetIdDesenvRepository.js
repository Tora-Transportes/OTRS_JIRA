const { Sql_Conn } = require('../../database/db-configs');
const { logger } = require('../../../utils/logs');

module.exports = new class GetIdDesenvRepository {
  async execute(numero_chamado) {
    try {
      return Sql_Conn.select('*').from('INTEGRATION_JIRA_OTRS').where('numero_chamado', numero_chamado);
    } catch (err) {
      logger.error(`GetIdDesenvRepository ${err.message}`);
    }
  }
};
