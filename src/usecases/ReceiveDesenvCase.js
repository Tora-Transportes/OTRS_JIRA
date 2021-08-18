const { logger } = require('../utils/logs');
const RequestJiraCase = require('./RequestJiraCase');
const { GetAllDesenvRepositor } = require('../infra/repositories/desenv');


module.exports = new class ReceiveDesenvCase {
  async execute() {
    try {
      const reports = GetAllDesenvRepositor.execute();

      for (const { 
         accountId,
         numero_chamado,
         titulo_mensagem,
         corpo_mensagem } of await reports) {
           
        const params = JSON.stringify({
          fields: {
            reporter: { accountId },
            customfield_10046: Number(numero_chamado),
            summary: titulo_mensagem,
            issuetype: {
              name: 'Intangível',
            },
            assignee: {
              accountId,
            },
            project: {
              key: 'KS',
            },
            description: {
              type: 'doc',
              version: 1,
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      text: corpo_mensagem,
                      type: 'text',
                    },
                  ]},
              ]},
          }});

        await RequestJiraCase.execute(params, numero_chamado);
      }
    } catch (err) {
      logger.error(`ReceiveDesenvCase ${err.message}`);
    }
  }
}; 
