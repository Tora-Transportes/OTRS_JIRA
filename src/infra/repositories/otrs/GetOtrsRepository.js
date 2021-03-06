const { db } = require('../../ssh/ssh-config');
const { logger } = require('../../../utils/logs');

module.exports = new class GetOtrsRepository {
  async execute() {
    try {
      const connection = await db();

      return connection.select(connection.raw(` 
        DISTINCT
		      CASE
		      WHEN TIC.customer_id = 'andre.silva' THEN "5d36fc07d7be220c1ab5239b"
		      WHEN TIC.customer_id = 'alexandre.teofilo' THEN "5d36fc07d7be220c1ab5239b"
		      WHEN TIC.customer_id = 'erlan.almeida' THEN "5ce8233383de300fe5d56edc"
		      WHEN TIC.customer_id = 'giuliana.costa' THEN "60ec5a7bcc1f700071f4632e"
		      WHEN TIC.customer_id = 'jeferson.silva' THEN "5dc471e3dfcafc0de6cce4cd"
          WHEN TIC.customer_id = 'jonathan.gomes' THEN "5d36fc07d7be220c1ab5239b"
          WHEN TIC.customer_id = 'jhony.santos' THEN "606b1cffedc14f0076796b7c"
          WHEN TIC.customer_id = 'marcio.formagini' THEN "5d51501803ef800dad5db672"
          WHEN TIC.customer_id = 'max.gomes' THEN "5f7c5bb7021acf0076e4f981"
          WHEN TIC.customer_id = 'nivaldo.marcal' THEN "611e53c346c6b500719998a9"
          WHEN TIC.customer_id = 'romulo.dpereira' THEN "5f7c9e22c59441007754491a"
          ELSE "5f7c9e22c59441007754491a" END AS accountId,
          TIC.customer_id AS nome_colaborador,
          TIC.tn AS numero_chamado,
          TIC.title AS titulo_mensagem,
          MIME.a_body AS corpo_mensagem,
          TIC.create_time AS data_criacao
          FROM ticket AS TIC
          INNER JOIN article AS ART ON ART.ticket_id = TIC.id
          INNER JOIN article_data_mime AS MIME ON MIME.id = ART.id
          INNER JOIN users AS USR ON USR.id = TIC.user_id
          WHERE TIC.customer_id REGEXP 'andre.silva|alexandre.teofilo|erlan.almeida|giuliana.costa|jeferson.silva|jonathan.gomes|jhony.santos|marcio.formagini|max.gomes|nivaldo.marcal|romulo.dpereira'
          AND MIME.create_by IN( '1', '3', '4', '7',
          '11', '14', '15', '17',
          '22', '50', '54', '73' )
          AND TIC.create_time >= CURDATE()
          AND TIC.type_id <> 1
          AND MIME.a_subject NOT LIKE('%%Re:%%')
          ORDER BY TIC.ID DESC;`) );
    } catch (err) {
      logger.error(`GetOtrsRepository ${err.message}`);
    }
  }
};
