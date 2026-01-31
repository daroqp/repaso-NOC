import CronJob = require("cron");

class Server {

    public static start(){

        console.log("Server started...");

        const job = new CronJob.CronJob(
            '*/2 * * * * *',
            () => {
                const date = new Date();
                console.log('2 second', date);
            },
        );

        job.start()
    }
}

export = Server
