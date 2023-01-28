import { EOL } from 'os';
import { LinterResult, LintResult } from 'stylelint';
import formatter from '../src/index';

const linterResult: LinterResult = { cwd: '', results: [], errored: false, output: null, reportedDisables: [], ruleMetadata: {} };

const emptyResult: LintResult = { deprecations: [], invalidOptionWarnings: [], parseErrors: [], warnings: [] };

const singleWarningResult: LintResult = {
    deprecations: [], invalidOptionWarnings: [], parseErrors: [], warnings: [
        { line: 1, column: 1, rule: 'rule', severity: 'error', text: 'lorem ipsum' }
    ]
};

describe('Formatter', () => {
    it('should return empty string for no results', () => {
        const result = formatter([], linterResult);
        expect(result).toBe('');
    });

    it('should return empty string for one empty result', () => {
        const result = formatter([emptyResult], linterResult);
        expect(result).toBe('');
    });

    it('should return empty string for many empty results', () => {
        const result = formatter([emptyResult, emptyResult, emptyResult], linterResult);
        expect(result).toBe('');
    });

    it('should return non empty string for a non empty results', () => {
        const result = formatter([singleWarningResult], linterResult);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
    });

    it('should return one line for one result, one warning', () => {
        const result = formatter([singleWarningResult], linterResult);
        expect(result.length).toBeGreaterThan(0);
        const lineCount = result.split(EOL).length;
        expect(lineCount).toBe(1);
    });

    it('should return two lines for two results, two warnings', () => {
        const result = formatter([singleWarningResult, singleWarningResult], linterResult);
        const lineCount = result.split(EOL).length;
        expect(lineCount).toBe(2);
    });
});
