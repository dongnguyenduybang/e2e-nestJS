import 'reflect-metadata';
import { Expose, Type } from 'class-transformer';
import {
    IsBoolean,
    IsArray,
    ValidateNested,
    IsDefined,
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    IsUrl,
} from 'class-validator';

export class UserProfileDTO {
    @Expose()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    displayName: string;

    @Expose()
    @IsUrl()
    @IsDefined()
    @IsNotEmpty()
    avatar: string;

    @Expose()
    @IsUrl()
    @IsDefined()
    @IsNotEmpty()
    originalAvatar: string;

    @Expose()
    @IsNumber()
    @IsDefined()
    userBadgeType: number;

    @Expose()
    @IsNumber()
    @IsDefined()
    avatarType: number;

    @Expose()
    @IsString()
    @IsOptional()
    cover: string;

    @Expose()
    @IsString()
    @IsOptional()
    decoratedAvatar: string;

    @Expose()
    @IsString()
    @IsOptional()
    originalDecoratedAvatar: string;

    @Expose()
    @IsString()
    @IsOptional()
    videoAvatar: string;
}

export class PresenceDataDTO {
    @Expose()
    @IsNumber()
    @IsDefined()
    presenceState: number;

    @Expose()
    @IsNumber()
    @IsDefined()
    lastUpdateInSeconds: number;

    @Expose()
    @IsString()
    @IsDefined()
    lastUpdateTime: string;
}

export class UserDataDTO {
    @Expose()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    userId: string;

    @Expose()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    username: string;

    @Expose()
    @ValidateNested()
    @Type(() => UserProfileDTO)
    @IsDefined()
    profile: UserProfileDTO;

    @Expose()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    createTime: string;

    @Expose()
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    updateTime: string;

    @Expose()
    @IsNumber()
    @IsDefined()
    userType: number;

    @Expose()
    @ValidateNested()
    @Type(() => PresenceDataDTO)
    @IsDefined()
    presenceData: PresenceDataDTO;
}

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
    users: any[];

    @Expose()
    @IsArray()
    @IsDefined()
    channels: any[];

    @Expose()
    @IsArray()
    @IsDefined()
    members: any[];

    @Expose()
    @IsArray()
    @IsDefined()
    messages: any[];

    @Expose()
    @IsArray()
    @IsDefined()
    channelMetadata: any[];
}

export class ResponseListBlockUserDTO {
    @Expose()
    @IsBoolean()
    @IsDefined()
    ok: boolean;

    @Expose()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UserDataDTO)
    @IsDefined()
    @IsNotEmpty()
    data: UserDataDTO[];

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

    @Expose()
    @IsNumber()
    @IsDefined()
    total: number;
}
