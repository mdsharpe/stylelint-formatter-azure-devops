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

    describe('returning a line per warning', () => {
        it('should return 1 lines for 1 empty result', () => {
            const result = formatter([emptyResult], linterResult);
            const lineCount = result.split(/\r\n|\r|\n/).length;
            expect(lineCount).toBe(2);
        });

        it('should return two lines for two results', () => {
            const result = formatter([emptyResult, emptyResult], linterResult);
            const lineCount = result.split(/\r\n|\r|\n/).length;
            expect(lineCount).toBe(2);
        });

    });
});
