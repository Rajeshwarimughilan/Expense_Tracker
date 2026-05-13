export class Logger{
    static info(message: string):void{
        console.log(`[INFO] ${message}`);
    }

    static error(message: string):void{
        console.log(`[ERROR] ${message}`);
    }

    static success(message: string):void{
        console.log(`[SUCCESS] ${message}`);
    }
}

// no state, no instance data,no unique objects needed