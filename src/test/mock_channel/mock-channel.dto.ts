import 'reflect-metadata';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsString, IsNotEmpty, IsDefined, IsArray, ValidateNested } from 'class-validator';

export class ChannelDTO {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    channelId: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    name: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    ownerId: string;

    @Expose()
    @IsArray()
    @IsDefined()
    @IsString({ each: true })
    messageIds: string[];

    @Expose()
    @IsArray()
    @IsDefined()
    @IsString({ each: true })
    memberIds: string[];
}

export class ResponseGetMockChannelDTO {
    @Expose()
    @IsBoolean()
    @IsDefined()
    ok: boolean;

    @Expose()
    @Type(() => ChannelDTO)
    @IsArray()
    @ValidateNested({ each: true })
    @IsDefined()
    data: ChannelDTO[];
}
