import { LogEntity } from "../../entities/log.entity.js";
import type { LogRepository } from "../../repository/log.repository.js";

interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ){}

    async execute( url: string ): Promise<boolean> {

        try {
            const req  = await fetch( url )

            if( !req.ok ) {
                throw new Error( `Error on check service ${ url }` );
            }

            const message = `Service ${ url } working`;
            const severityLevel = 'low';
            const origin = 'check-service.ts';

            const log = new LogEntity({
              message: message,
              level: severityLevel,
              origin: origin
            })

            this.logRepository.saveLog( log )
            this.successCallback()

            return true

        } catch ( error ) {

            const errorMessage = `${ url } is not ok. ${ error }`;
            const severityLevel = 'high';
            const origin = 'check-service.ts';

            const log = new LogEntity({
              message: errorMessage,
              level: severityLevel,
              origin: origin
            })

            this.logRepository.saveLog( log )
            this.errorCallback( errorMessage )

            return false
        }

    }
}
