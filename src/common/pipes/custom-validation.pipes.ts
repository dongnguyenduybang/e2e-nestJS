import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
    transform(value: any) {
        const errors: string[] = [];

        if ('prefix' in value) {
            if (!value.prefix) {
                errors.push('Prefix must not be null or empty');
            } else if (typeof value.prefix !== 'string') {
                errors.push('Prefix must be a string');
            } else if (value.prefix.length < 5) {
                errors.push('Prefix must be longer than or equal to 5 characters');
            }
        }

        if ('quantity' in value) {
            if (value.quantity == null) {
                errors.push('Quantity must not be null or empty');
            } else if (typeof value.quantity !== 'number') {
                errors.push('Quantity must be a number');
            } else if (value.quantity < 1) {
                errors.push('Quantity must not be less than 1');
            } else if (value.quantity > 100) {
                errors.push('Quantity must not be greater than 100');
            }

        }

        if ('badge' in value) {
            if (value.badge == null) {
                errors.push('Badge must not be null');
            } else if (typeof value.badge !== 'number') {
                errors.push('Badge must be a number');
            } else if (value.badge > 3) {
                errors.push('Badge must not be greater than 3');
            }
        }

        if ('typeChannel' in value) {
            if (!value.typeChannel) {
                errors.push('TypeChannel must not be null or empty');
            } else if (typeof value.typeChannel !== 'number') {
                errors.push('TypeChannel must be a number');
            } else if (value.typeChannel > 3) {
                errors.push('TypeChannel must not be greater than 3');
            }

        }

        if ('totalMessages' in value) {
            if (value.totalMessages == null) {
                errors.push('TotalMessages must not be null or empty');
            } else if (typeof value.totalMessages !== 'number') {
                errors.push('TotalMessages must be a number');
            } else if (value.totalMessages > 100) {
                errors.push('TotalMessages must not be greater than 100');
            }
        }

        if ('workspaceId' in value) {
            if (value.workspaceId == null) {
                errors.push('WorkspaceId must not be null or empty')
            } else if (typeof value.workspaceId !== 'string') {
                errors.push('WorkspaceId must be a string')
            }
        }

        if ('channelId' in value) {
            if (value.channelId == null) {
                errors.push('ChannelId must not be null or empty')
            } else if (typeof value.channelId !== 'string') {
                errors.push('ChannelId must be a string')
            } else if (value.type < 0) {
                errors.push('Type must be ')
            }
        }

        if ('type' in value) {
            if (value.type == null) {
                errors.push('Type must not be null or empty')
            } else if (typeof value.type !== 'number') {
                errors.push('Type must be a number')
            } else if (value.type < 0) {
                errors.push('Type must not be less than 0')
            } else if (value.type > 2) {
                errors.push('Type must not be geater than 2')
            }
        }

        if (errors.length > 0) {
            throw new BadRequestException({
                ok: false,
                data: null,
                error: {
                    code: 400,
                    message: 'Validation failed',
                    details: errors.map((err, index) => `Error ${index + 1}: ${err}`),
                },
            });
        }
        return value;
    }
}
