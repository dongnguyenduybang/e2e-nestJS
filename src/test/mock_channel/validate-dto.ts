
import { ResponseGetMockChannelDTO } from './mock-channel.dto'
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export const validateMockChannelDTO = async (data: any) => {
    const responseDTO = plainToInstance(ResponseGetMockChannelDTO, data, { excludeExtraneousValues: true });

    const errors = await validate(responseDTO);
    if (errors.length > 0) {

        let errorMessages = '';

        errors.forEach((error: ValidationError) => {

            if (error.constraints) {
                Object.values(error.constraints).forEach((message) => {
                    errorMessages += `${error.property}: ${message} `;
                });
            }

            if (error.children && error.children.length > 0) {
                error.children.forEach((childError) => {

                    if (childError.constraints) {
                        Object.values(childError.constraints || {}).forEach((message) => {
                            errorMessages += `${childError.property} - ${message} `;
                        });
                    }

                    if (childError.children && childError.children.length > 0) {
                        childError.children.forEach((subChildError) => {

                            Object.values(subChildError.constraints || {}).forEach((message) => {
                                errorMessages += `${subChildError.property} - ${message} `;
                            });
                        });
                    }
                });
            }
        });

        return {
            status: 'Failure',
            responseDTO: errorMessages.trim()
        }
    } else {
        return {

            status: 'PASS',
            responseDTO: responseDTO

        }
    }
}