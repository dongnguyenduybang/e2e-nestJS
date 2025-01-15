import 'reflect-metadata';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsString, IsNotEmpty, IsDefined, IsArray, IsNumber, ValidateNested } from 'class-validator';

export class UserDataDTO {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userId: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    username: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    token: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    securityKey: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    recoverKey: string;

    @Expose()
    @IsNumber()
    @IsDefined()
    badge: number;
}

export class ResponseGetMockUserDTO {
    @Expose()
    @IsBoolean()
    @IsDefined()
    ok: boolean;

    @Expose()
    @Type(() => UserDataDTO)
    @IsArray()
    @ValidateNested({ each: true })
    @IsDefined()
    data: UserDataDTO[];
}
