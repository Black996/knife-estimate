import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('impl code before the request reaches the controller');


        return next.handle()
            .pipe(map(
                (data) => {
                    console.log(`impl code after the controller finishes processing the request`)
                }),
                );
    }
}