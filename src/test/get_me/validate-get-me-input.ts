
import { getMockChannelId } from '../share-data'


export const testCases = [
    {
        describe: 'Test Get Me',
        cases: [
            {
                name: 'should return error if session token is null or undefined',
                token: null,
                expectedDetails: [
                    "token should not be null or undefined",
                ],
            },
            {
                name: 'should return error if session token is empty',
                token: '',
                expectedDetails: [
                    "userId should not be empty",

                ],
            },
            {
                name: 'should return get me successfully',
                token: 'w3vdXCs-fl0nvkwiYvKqRXTY-2n-nTlASL8IsJxcU-AeAgF247fu3VFzJVbRhVSuqwS9XK5he8Nyn-Is70ovsA',
                expectedDetails: ['get me get successfully'],
            },

        ],
    },

];
