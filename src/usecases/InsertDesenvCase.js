const { logger } = require('../utils/logs');
const { GetOtrsRepository } = require('../infra/repositories/otrs');
const  { InsertDesenvRepository, GetIdDesenvRepository }  = require('../infra/repositories/desenv');
const  ReceiveDesenvCase   = require('./ReceiveDesenvCase');

module.exports = new class InsertDesenvCase {
  async execute() {
    try {
      const arr = [];

      for (const {
        nome_colaborador,
        numero_chamado,
        titulo_mensagem,
        corpo_mensagem,
        data_criacao,
        accountId
      } of await GetOtrsRepository.execute()) {
        
        const result = {
          nome_colaborador,
          numero_chamado,
          titulo_mensagem,
          corpo_mensagem, 
          data_criacao,
          accountId
        };
        arr.push(result);
        
        const exists = await GetIdDesenvRepository.execute(numero_chamado);

        if (exists.length === 0 ){
           InsertDesenvRepository.execute(result);
        } else {
          logger.error(`JiraCase: ${numero_chamado} já existe`);
        } 
      } 

      ReceiveDesenvCase.execute(arr);
    } catch (err) {
      logger.error(`InsertDesenvCase ${err.message}`);
    }
  }
};
