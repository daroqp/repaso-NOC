import * as fs from 'fs'

import type { LogDataSource } from "../../domain/datasources/log.datasource.js";
import type { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity.js";

export class FileSystemDatasource implements LogDataSource {
    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createLogFiles();
    }

    private createLogFiles = () => {
        if( !fs.existsSync( this.logPath ) ) {
            fs.mkdirSync( this.logPath )
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach( path => {
                if( fs.existsSync( path ) ) {
                    fs.writeFileSync( path, '' );
                }
            })
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${ JSON.stringify(newLog) }\n`;
        const lowSeverityLevel: LogSeverityLevel = 'low'
        const mediumSeverityLevel: LogSeverityLevel = 'medium'

        fs.appendFileSync( this.allLogsPath, logAsJson )

        if( newLog.level === lowSeverityLevel ) return;

        if( newLog.level === mediumSeverityLevel ) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson )
        } else {
            fs.appendFileSync( this.highLogsPath, logAsJson )
        }
    }

    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}
