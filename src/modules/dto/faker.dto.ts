
export interface UserDTO {

    prefix: string;
    quantity: number;
    badge: number;
}

export interface ChannelDTO {

    prefix: string
    quantity: number
    typeChannel: number
    totalMessages: number
}

export interface FriendDTO {

    preix: string
    type: number
}

export interface MessageDTO {

    workspaceId: string
    channelId: string
    quantity: number
}