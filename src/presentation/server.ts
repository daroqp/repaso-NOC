import CronService = require("./cron/cron-service");
import CheckService = require("./domain/use-cases/checks/check-service");

class Server {

    public static start(){

        console.log("Server started...");

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com.ar'
                new CheckService(
                    () => console.log( 'success' ),
                    ( error ) => console.log( error )
                ).execute( url )
            }
        )
    }
}

export = Server
