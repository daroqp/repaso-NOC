import * as fs from 'fs'

import type { LogDataSource } from "../../domain/datasources/log.datasource.js";
import { LogEntity, type LogSeverityLevel } from "../../domain/entities/log.entity.js";

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

  private getLogFromFiles = ( path: string ): LogEntity[] => {
    const content = fs.readFileSync( path, 'utf-8');
    const logs = content.split( '\n' ).map(
      log => LogEntity.fromJson( log )
    )

    return logs
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    switch( severityLevel ) {
      case 'low':
        return this.getLogFromFiles(this.allLogsPath)

      case 'medium':
        return this.getLogFromFiles(this.mediumLogsPath)

      case 'high':
        return this.getLogFromFiles(this.highLogsPath)

      default:
        throw new Error(`${ severityLevel } not implemented`)
    }
  }
}
