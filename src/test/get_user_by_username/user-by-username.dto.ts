import 'reflect-metadata';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, IsNotEmpty, ValidateNested, IsDefined, IsOptional } from 'class-validator';

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
    @IsOptional()
    acceptTime: string;

    @Expose()
    @IsString()
    @IsOptional()
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
    @IsOptional()
    statusData: any | null;

    @Expose()
    @IsNumber()
    @IsDefined()
    mediaPermissionSetting: number;

    @Expose()
    @Type(() => FriendDataDTO)
    @ValidateNested()
    @IsDefined()
    friendData: FriendDataDTO;

    @Expose()
    @IsBoolean()
    @IsDefined()
    blocked: boolean;
}

export class ResponseGetUserByUsernameDTO {
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
