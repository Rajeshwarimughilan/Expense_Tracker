export class AppError extends Error{

    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 500){
        super(message);// equivalent to Event.call(this, message);

        this.statusCode = statusCode;
        this.isOperational = true;//to handle Operational Errors

        Object.setPrototypeOf(this, new.target.prototype);//repairs prototype chain
        Error.captureStackTrace(this);

    }


}