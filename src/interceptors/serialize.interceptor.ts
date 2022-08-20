import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

export function Serialize<T>(dto:ClassConstructor<T>){
    return new SerializeInterceptor(dto);
}

class SerializeInterceptor<T> implements NestInterceptor {

    constructor(private dto:ClassConstructor<T>){}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
            .pipe(map(
                (data) => plainToInstance(this.dto, data, {
                        excludeExtraneousValues: true
                    })
                ),
            );
    }
}