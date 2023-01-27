import { LinterResult } from 'stylelint';
import formatter from '../src/index';

const linterResult: LinterResult = {
    cwd: '',
    results: [],
    errored: false,
    output: null,
    reportedDisables: [],
    ruleMetadata: {}
};

describe('Formatter', () => {
    it('should return a string', () => {
        const result = formatter([], linterResult);
        expect(typeof result).toBe('string');
    });
});
