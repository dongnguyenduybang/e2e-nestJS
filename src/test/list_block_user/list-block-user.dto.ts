import 'reflect-metadata';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsArray, ValidateNested, IsDefined, IsEmpty, IsNotEmpty } from 'class-validator';

export class PagingDTO {
    @Expose()
    @IsBoolean()
    @IsDefined()
    @IsNotEmpty()
    hasPrev: boolean;

    @Expose()
    @IsBoolean()
    @IsDefined()
    @IsNotEmpty()
    hasNext: boolean;
}

export class IncludesDTO {
    @Expose()
    @IsArray()
    @IsDefined()
    @IsNotEmpty()
    users: any[];

    @Expose()
    @IsArray()
    @IsDefined()
    @IsNotEmpty()
    channels: any[];

    @Expose()
    @IsArray()
    @IsDefined()
    @IsNotEmpty()
    members: any[];

    @Expose()
    @IsArray()
    @IsDefined()
    @IsNotEmpty()
    messages: any[];

    @Expose()
    @IsArray()
    @IsDefined()
    @IsNotEmpty()
    channelMetadata: any[];
}

export class ResponseListBlockUserDTO {
    @Expose()
    @IsBoolean()
    @IsDefined()
    ok: boolean;

    @Expose()
    @IsArray()
    @IsDefined()
    @IsNotEmpty()
    data: any[];

    @Expose()
    @ValidateNested()
    @Type(() => PagingDTO)
    @IsDefined()
    @IsNotEmpty()
    paging: PagingDTO;

    @Expose()
    @ValidateNested()
    @Type(() => IncludesDTO)
    @IsDefined()
    @IsNotEmpty()
    includes: IncludesDTO;
}
