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
}

export class SecurityDTO {
    @Expose()
    @ValidateNested()
    recoveryCode: { enable: boolean };

    @Expose()
    @ValidateNested()
    smartOTP: { enable: boolean };
}

export class PrivacyDTO {
    @Expose()
    @ValidateNested()
    mediaPermission: { value: number };
}

export class SettingDTO {
    @Expose()
    @Type(() => SecurityDTO)
    @ValidateNested()
    security: SecurityDTO;

    @Expose()
    @Type(() => PrivacyDTO)
    @ValidateNested()
    privacy: PrivacyDTO;
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
    @Type(() => ProfileDTO)
    @ValidateNested()
    @IsDefined()
    profile: ProfileDTO;

    @Expose()
    @IsDefined()
    statusData: null | unknown;

    @Expose()
    @IsBoolean()
    @IsDefined()
    globalNotificationStatus: boolean;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userConnectLink: string;

    @Expose()
    @Type(() => SettingDTO)
    @ValidateNested()
    @IsDefined()
    setting: SettingDTO;
}

export class ResponseGetMeDTO {
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
