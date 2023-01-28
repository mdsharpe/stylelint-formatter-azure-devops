import { type Warning } from "stylelint";

export default function formatMessage(warning: Warning, sourcePath?: string): string {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    warning = warning || {};

    const severity = typeof warning.severity === 'string'
        && warning.severity.toUpperCase() === 'WARNING'
        ? 'warning'
        : 'error';

    const properties = [`type=${severity}`];

    if (typeof sourcePath === 'string' && sourcePath.length > 0) {
        properties.push(`sourcepath=${sourcePath}`);
    }

    if (typeof warning.line === 'number') {
        properties.push(`linenumber=${warning.line}`);
    }

    if (typeof warning.column === 'number') {
        properties.push(`columnnumber=${warning.column}`);
    }

    if (typeof warning.rule === 'string' && warning.rule.length > 0) {
        properties.push(`code=${warning.rule}`);
    }

    return `##vso[task.logissue ${properties.join(';')}]${warning.text}`;
}
