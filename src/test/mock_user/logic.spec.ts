import axios from 'axios';
import Table from 'cli-table3';

describe('MockUser Logic Validation', () => {

    let payload, baseCountryCode, baseUrl;
    let errors: { field: string, expected: string, actual: string }[] = [];

    beforeAll(async () => {

        baseUrl = process.env.API_BASE_URL + 'InternalFaker/MockUsers';
        baseCountryCode = process.env.HEADER_COUNTRY_CODE;
        payload = { quantity: 1, type: 1 };
        errors = [];
    });

    it('Test logic mock user', async () => {

        const response = await axios.post(baseUrl, payload, {});

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

        const assertNumber = (value: any, name: string) => {
            if (typeof value !== 'number') {
                errors.push({ field: name, expected: 'number', actual: typeof value });
            }
        };

        const assertArray = (value: any, name: string) => {
            if (!Array.isArray(value)) {
                errors.push({ field: name, expected: 'array', actual: typeof value });
            }
        };

        const { ok, data } = response.data;

        if (ok !== true) {
            errors.push({ field: 'ok', expected: 'true', actual: String(ok) });
        }

        assertDefined(data, 'data', 'array');
        assertArray(data, 'data');

        data.forEach((item, index) => {
            assertDefined(item.userId, `data[${index}].userId`, 'string');
            assertString(item.userId, `data[${index}].userId`);

            assertDefined(item.username, `data[${index}].username`, 'string');
            assertString(item.username, `data[${index}].username`);

            assertDefined(item.token, `data[${index}].token`, 'string');
            assertString(item.token, `data[${index}].token`);

            assertDefined(item.securityKey, `data[${index}].securityKey`, 'string');
            assertString(item.securityKey, `data[${index}].securityKey`);

            assertDefined(item.recoverKey, `data[${index}].recoverKey`, 'string');
            assertString(item.recoverKey, `data[${index}].recoverKey`);

            assertDefined(item.badge, `data[${index}].badge`, 'number');
            assertNumber(item.badge, `data[${index}].badge`);
        });

        const table = new Table({
            head: ["Field", "ExpectedType", "ActualValue"],
            colWidths: [20, 40, 40],
            wordWrap: true,
        });
        if (errors.length > 0) {
            errors.forEach((result) => {
                table.push([
                    result.field,
                    result.expected,
                    result.actual
                ]);
            });
        }
        console.log(table.toString());

        expect(errors).toEqual([]);
    });
});
