export type LogSeverityLevel = 'low' | 'medium' | 'high'

export class LogEntity {

    public level: string;
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    static fromJson = ( json: string ): LogEntity => {
    const { message, level, createdAt } = JSON.parse( json );

    // es recomendable hacerlo para todos los parametros
    if( !message ) throw new Error('Message is required')

    const log = new LogEntity( message, level);
    log.createdAt = new Date( createdAt )

    return log
  }
}

