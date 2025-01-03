import { IsNotEmpty, IsNumber, IsPositive, IsString, Max, Min } from "class-validator";

export class UserDTO {

    prefix: string;
    quantity: number;
    badge: number;
}

export class ChannelDTO {

    prefix: string
    quantity: number
    typeChannel: number
    totalMessages: number
}

export class FriendDTO {

    preix: string
    type: number
}

export class MessageDTO {

    workspaceId: string
    channelId: string
    quantity: number
}