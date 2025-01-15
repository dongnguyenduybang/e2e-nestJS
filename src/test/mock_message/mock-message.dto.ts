import 'reflect-metadata';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsString, IsNotEmpty, IsDefined, IsArray } from 'class-validator';

export class ResponseGetMockMessageDTO {
    @Expose()
    @IsBoolean()
    @IsDefined()
    ok: boolean;

    @Expose()
    @IsArray()
    @IsString({ each: true })
    @IsDefined()
    data: string[];
}
