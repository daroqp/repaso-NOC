import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { CronService } from "./cron/cron-service.js"

export class Server {

    public static start(){

        console.log("Server started...");

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://www.google.com.ar';
                new CheckService(
                    () => console.log( 'success' ),
                    ( error: string ) => console.log( error )
                ).execute( url )
            }
        )
    }
}
