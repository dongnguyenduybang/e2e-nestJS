import axios from 'axios';
import { getMockUser } from '../share-data';

describe('MockChannel Logic Validation', () => {
    let baseUrl: string;
    let userId: string;
    let baseCountryCode: string, payload: any;
    let errors: { field: string, expected: string, actual: string }[] = [];

    beforeAll(async () => {
        baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockChannels';

        const mockChannel = await getMockUser();
        userId = mockChannel.userId;
        baseCountryCode = process.env.HEADER_COUNTRY_CODE;
        errors = [];
        payload = { quantity: 2, prefix: "aaaaaaa", typeChannel: 0, totalMessages: 1 };
    });

    it('Test Logic MockChannel', async () => {
        const response = await axios.post(baseUrl, payload, {
            headers: {
                'x-user-id': userId,
                'x-country-code': baseCountryCode
            }
        });

        const assertDefined = (value: any, name: string, expectedType: string) => {
            if (value === undefined || value === null) {
                errors.push({ field: name, expected: expectedType, actual: 'undefined/null' });
            }
        };

        const assertString = (value: any, name: string) => {
            if (typeof value !== 'string') {
                errors.push({ field: name, expected: 'string', actual: typeof value });
            }
        };

        const assertArray = (value: any, name: string) => {
            if (!Array.isArray(value)) {
                errors.push({ field: name, expected: 'array', actual: typeof value });
            }
        };

        const { ok, data } = response.data;

        if (!ok) errors.push({ field: 'ok', expected: 'true', actual: String(ok) });

        assertDefined(data, 'data', 'array');
        assertArray(data, 'data');

        data.forEach((channel, index) => {

            assertDefined(channel.channelId, `data[${index}].channelId`, 'string');
            assertString(channel.channelId, `data[${index}].channelId`);

            assertDefined(channel.ownerId, `data[${index}].ownerId`, 'string');
            assertString(channel.ownerId, `data[${index}].ownerId`);

            assertDefined(channel.messageIds, `data[${index}].messageIds`, 'array');
            assertArray(channel.messageIds, `data[${index}].messageIds`);

            if (payload.typeChannel === 0) {
                if (!channel.name || channel.name.trim() === '') {
                    errors.push({
                        field: `data[${index}].name`,
                        expected: 'non-empty string',
                        actual: 'empty'
                    });
                }
            } else if ([1, 2, 3].includes(payload.typeChannel)) {
                if (channel.name && channel.name.trim() !== '') {
                    errors.push({
                        field: `data[${index}].name`,
                        expected: 'empty string',
                        actual: channel.name
                    });
                }
            }
        });

        if (errors.length > 0) {
            console.table(errors.map(error => ({
                Field: error.field,
                ExpectedType: error.expected,
                ActualValue: error.actual
            })));
        }

        expect(errors).toEqual([]);
    });
});
