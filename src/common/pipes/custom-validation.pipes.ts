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
            if (value.quantity === null || value.quantity === undefined) {
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
