const { CronJob } = require('cron');
const { JiraService } = require('../../usecases');

module.exports = new class ProcessExecute {
   start() {
    const job = new CronJob(
      '*/1 * * * *', () => {  

        JiraService.execute();
      }, 

       null, true, 'America/Sao_Paulo',
    );

    job.start();
  }
};  // Run work every 1 minute
