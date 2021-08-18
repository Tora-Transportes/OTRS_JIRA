const { Sql_Conn } = require('../../database/db-configs');
const { logger } = require('../../../utils/logs');

module.exports = new class UpdateDesenvRepository {
  async execute(numero_chamado) {
    try {
       if (!numero_chamado) throw new Error('numero_chamado Not informed!');
  
       return Sql_Conn('INTEGRATION_JIRA_OTRS').update('status_envio', 1).where('numero_chamado', numero_chamado);
    } catch (err) {
      logger.error(`UpdateDesenvRepository ${err.message}`);
    }  
  }
};
