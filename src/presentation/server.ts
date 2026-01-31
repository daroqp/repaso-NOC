import CronService = require("./cron/cron-service");

class Server {

    public static start(){

        console.log("Server started...");

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const date =new Date();
                console.log('5 second', date);
            }
        )
    }
}

export = Server
