const { queryStrings, parse } = require('./queryStrings');

describe('Object to query string', () => {
    it('should create a valid query string when an object is passed ', () => {
        const obj = {
            name: 'Fabio',
            profession: 'Developer',
        };

        expect(queryStrings(obj)).toBe('name=Fabio&profession=Developer');
    });

    it('should create a valid query string when an array is passed ', () => {
        const obj = {
            name: 'Fabio',
            profession: 'Developer',
            abilities: ['JS', 'TS'],
        };

        expect(queryStrings(obj)).toBe(
            'name=Fabio&profession=Developer&abilities=JS,TS',
        );
    });
    it('should throw an error when an object is passed as value', () => {
        const obj = {
            name: 'Fabio',
            profession: 'Developer',
            abilities: {
                first: 'JS',
                second: 'TS',
            },
        };

        expect(() => {
            queryStrings(obj);
        }).toThrowError();
    });
});
describe('Query string to object', () => {
    it('should create a valid object when a query string is given ', () => {
        const query = 'name=Thaynar&profissao=desenvolvedora';

        expect(parse(query)).toEqual({
            name: 'Thaynar',
            profissao: 'desenvolvedora',
        });
    });

    it('should convert a query string of a single key-value pair ', () => {
        const query = 'name=Thaynar';

        expect(parse(query)).toEqual({
            name: 'Thaynar',
        });
    });
    it('should convert a query string oto an object ', () => {
        const qs = 'name=Thaynar&abilities=JS,TDD';

        expect(parse(qs)).toEqual({
            name: 'Thaynar',
            abilities: ['JS', 'TDD'],
        });
    });
});
