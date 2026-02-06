import { envs } from "../config/adapters/envs.adapter.js";
import { CheckService } from "../domain/use-cases/checks/check-service.js";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource.js";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl.js";
import { CronService } from "./cron/cron-service.js"
import { EmailService } from "./email/email.service.js";

const fileSystemLogDatasource = new FileSystemDatasource()
const fileSystemLogRepository = new LogRepositoryImpl( fileSystemLogDatasource )

export class Server {

    public static start(){

        console.log("Server started...");

        const emailService = new EmailService();
        emailService.sendEmail({
          to: 'daro.qp@gmail.com',
          subject: 'Logs de sistema',
          htmlBody: `
            <h3>Logs de sistema NOC </h3>
            <p>Lorem ipsum y cosas demases</p>
            <p>Ver logs adjuntos</p>
          `
        })

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://www.localhost:3000';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log( `${ url } is working.` ),
        //             ( error: string ) => console.log( error )
        //         ).execute( url )
        //     }
        // )
    }
}
