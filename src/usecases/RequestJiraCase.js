const { logger } = require('../utils/logs');
const { UpdateDesenvRepository } = require('../infra/repositories/desenv');
const api = require('../application/config/baseUrl');

module.exports = new class RequestJiraCase {
  async execute(params, numero_chamado) {
    try {      
       
      const { data, status } = await api.post('/issue', params);

      if (status === 201) {
        await UpdateDesenvRepository.execute(numero_chamado);
        logger.info(data.self, 'Jira request OK');
      }  

    } catch (err) {
      logger.error(`RequestJiraCase ${err.message}`);
    }
  }
};
