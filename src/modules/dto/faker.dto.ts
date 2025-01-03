import { IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class UserDTO {

    prefix: string;
    quantity: number;
    badge: number;
}

// export class ChannelDTO {

//     prefix: string
//     quantity: number
//     typeChannel: number
//     totalMessages: number
// }

// export class FriendDTO {
//     @IsString()
//     @IsNotEmpty()
//     preix: string

//     @IsNumber()
//     @IsPositive()
//     @IsNotEmpty()
//     type: number
// }

// export class MessageDTO {
//     @IsString()
//     @IsNotEmpty()
//     workspaceId: string
//     channelId: string

//     @IsNumber()
//     @IsPositive()
//     @IsNotEmpty()
//     quantity: number
// }