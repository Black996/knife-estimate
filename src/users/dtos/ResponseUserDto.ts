import { Expose } from "class-transformer";

export class ResponseUserDto {
    @Expose()
    username: string;
}