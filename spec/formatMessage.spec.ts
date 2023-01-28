import { type Warning } from 'stylelint';

import formatMessage from '../src/formatMessage';

const VSO_LOGISSUE_TASK_PREFIX = '##vso[task.logissue';

const warning: Warning = {
    line: 3,
    column: 12,
    endLine: 4,
    endColumn: 15,
    rule: 'block-no-empty',
    severity: 'warning',
    text: 'You should not have an empty block (block-no-empty)',
};

const error: Warning = {
    line: 3,
    column: 12,
    endLine: 4,
    endColumn: 15,
    rule: 'block-no-empty',
    severity: 'error',
    text: 'You should not have an empty block (block-no-empty)',
};

describe('FormatMessage', () => {
    it('should return expected message if no warning provided', () => {
        const result = formatMessage(null as unknown as Warning);
        expect(result).toBe(
            VSO_LOGISSUE_TASK_PREFIX + ' ' + 'type=error' + ']' + 'undefined'
        );
    });

    it('should return a string', () => {
        const result = formatMessage(warning);
        expect(typeof result).toBe('string');
    });

    it('should start with VSO LogIssue task prefix', () => {
        const result = formatMessage(warning);
        expect(result.length).toBeGreaterThanOrEqual(
            VSO_LOGISSUE_TASK_PREFIX.length
        );
        expect(result.startsWith(VSO_LOGISSUE_TASK_PREFIX)).toBeTrue();
    });

    it('should end with message', () => {
        const result = formatMessage(warning);
        expect(result.endsWith(warning.text)).toBeTrue();
    });

    it('should contain type error', () => {
        const result = formatMessage(error);
        expect(result).toContain('type=error');
    });

    it('should contain type error', () => {
        const result = formatMessage(warning);
        expect(result).toContain('type=warning');
    });

    it('should contain line number', () => {
        const result = formatMessage(warning);
        expect(result).toContain('linenumber=' + warning.line.toString());
    });

    it('should contain column number', () => {
        const result = formatMessage(warning);
        expect(result).toContain('columnnumber=' + warning.column.toString());
    });

    it('should contain error code', () => {
        const result = formatMessage(warning);
        expect(result).toContain('code=' + warning.rule);
    });

    it('should contain source path', () => {
        const result = formatMessage(warning, 'foo/bar.scss');
        expect(result).toContain('sourcepath=foo/bar.scss');
    });
});
