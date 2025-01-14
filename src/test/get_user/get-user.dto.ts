import 'reflect-metadata';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, IsNotEmpty, ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';

export class ProfileDTO {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    displayName: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    avatar: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
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
    cover: string;

    @Expose()
    @IsString()
    decoratedAvatar: string;

    @Expose()
    @IsString()
    originalDecoratedAvatar: string;

    @Expose()
    @IsString()
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
    @IsNotEmpty()
    @IsDefined()
    lastUpdateTime: string;
}

export class FriendDataDTO {
    @Expose()
    @IsNumber()
    @IsDefined()
    status: number;

    @Expose()
    @IsString()
    acceptTime: string;

    @Expose()
    @IsString()
    deleteTime: string;
}

export class DataDTO {
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
    @Type(() => ProfileDTO)
    @ValidateNested()
    @IsDefined()
    profile: ProfileDTO;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    createTime: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    updateTime: string;

    @Expose()
    @IsNumber()
    @IsDefined()
    userType: number;

    @Expose()
    @Type(() => PresenceDataDTO)
    @ValidateNested()
    @IsDefined()
    presenceData: PresenceDataDTO;

    @Expose()
    @IsDefined()
    statusData: null | unknown;

    @Expose()
    @Type(() => FriendDataDTO)
    @ValidateNested()
    @IsDefined()
    friendData: FriendDataDTO;

    @Expose()
    @IsNumber()
    @IsDefined()
    mediaPermissionSetting: number;

    @Expose()
    @IsBoolean()
    @IsDefined()
    blocked: boolean;
}

export class ResponseGetUserDTO {
    @Expose()
    @IsBoolean()
    @IsDefined()
    ok: boolean;

    @Expose()
    @Type(() => DataDTO)
    @ValidateNested()
    @IsDefined()
    data: DataDTO;
}
