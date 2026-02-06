export type LogSeverityLevel = 'low' | 'medium' | 'high'

export interface LogEntityOptions {
  level: string;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {

  public level: string;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor( options: LogEntityOptions ) {
    const { message, level, origin, createdAt = new Date() } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = ( json: string ): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse( json );

    // es recomendable hacerlo para todos los parametros
    if( !message ) throw new Error('Message is required')

      const log = new LogEntity({
        message: message,
        level: level,
        createdAt: createdAt,
        origin: origin
      });

      return log
  }
}

