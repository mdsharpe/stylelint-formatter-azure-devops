import formatMessage from '../src/formatMessage';

describe('FormatMessage', () => {
    it('should return a string', () => {
        const result = formatMessage();
        expect(typeof result).toBe('string');
    });
});
