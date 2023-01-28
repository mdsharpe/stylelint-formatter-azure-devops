import { Warning } from 'stylelint';
import formatMessage from '../src/formatMessage';

const VSO_LOGISSUE_TASK_PREFIX = '##vso[task.logissue';

const warning: Warning = {
    line: 3,
    column: 12,
    endLine: 4,
    endColumn: 15,
    rule: 'block-no-empty',
    severity: 'error',
    text: 'You should not have an empty block (block-no-empty)'
};

describe('FormatMessage', () => {
    it('should return a string', () => {
        const result = formatMessage(warning);
        expect(typeof result).toBe('string');
    });

    it ('should start with VSO LogIssue task prefix', () => {
        const result = formatMessage(warning);
        expect(result.length).toBeGreaterThanOrEqual(VSO_LOGISSUE_TASK_PREFIX.length);
        expect(result.startsWith(VSO_LOGISSUE_TASK_PREFIX)).toBeTrue();
    })
});
