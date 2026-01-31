import CronJob = require("cron");

type CronTime = string | Date;
type OnTick = () => void;

class CronService {

    static createJob(cronTime: CronTime, onTick: OnTick) {

        const job = new CronJob.CronJob( cronTime, onTick );

        job.start();

        return job;
    }
}

export = CronService
