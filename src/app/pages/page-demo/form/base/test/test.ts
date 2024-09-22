import { Observable,of,from,interval,take,map, concatMap, filter, finalize, throwError, catchError } from 'rxjs'

export const ob=interval(1000).pipe(
    map(val=>val*2),
    filter(val=>val<4),//此时不会触发complete
    take(5)
);

export const mp=of(1,2,3).pipe(
    map(val=>{
        if(val==2){
            throw new Error(String(val))
        }
        return val*2
    }),
    catchError((err)=>{
        return throwError(()=>{
            return new Error(`${err} is Error`);
        })
    })
)
 