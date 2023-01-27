import { LinterResult, LintResult } from 'stylelint';
import formatter from '../src/index';

const emptyResult: LintResult = {
    deprecations: [],
    invalidOptionWarnings: [],
    parseErrors: [],
    warnings: []
};

const linterResult: LinterResult = {
    cwd: '',
    results: [],
    errored: false,
    output: null,
    reportedDisables: [],
    ruleMetadata: {}
};

describe('Formatter', () => {
    it('should return empty string for no results', () => {
        const result = formatter([], linterResult);
        expect(typeof result).toBe('string');
        expect(result).toBe('');
    });

    it('should return a string', () => {
        const result = formatter([emptyResult], linterResult);
        expect(typeof result).toBe('string');
    });

    // Should probably be per warning..!
    it('should return a string with a line per result', () => {
        const result = formatter([emptyResult, emptyResult, emptyResult], linterResult);
        const lineCount = result.split(/\r\n|\r|\n/).length;
        expect(lineCount).toBe(3);
    });
});
