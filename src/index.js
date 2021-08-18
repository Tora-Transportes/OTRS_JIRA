const { logger } = require('../src/utils/logs');
const ProcessExecute = require('./main/tasks/index');

class Application {
  static async start() {
    try {
      logger.info('Application in execution');

      ProcessExecute.start();
    } catch (err) {
      logger.error(err);
    }
  }
}

Application.start();
