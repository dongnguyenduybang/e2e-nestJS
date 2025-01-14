import 'reflect-metadata';
import { Expose } from 'class-transformer';
import { IsBoolean, IsString, IsArray, IsDefined } from 'class-validator';

export class ResponseGetMockFriendDTO {
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
