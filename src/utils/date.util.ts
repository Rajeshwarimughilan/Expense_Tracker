export function isDateInRange(date: string, startDate?: string, endDate?: string): boolean{
    const target = new Date(date).getTime();

    if(startDate){
        const start = new Date(startDate).getTime();
        if(target < start){
            return false;
        }
    }

    if(endDate){
        const start = new Date(endDate).getTime();
        if(target > start){
            return false;
        }
    }
    return true;

}