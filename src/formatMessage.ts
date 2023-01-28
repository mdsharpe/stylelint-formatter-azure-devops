import { type Warning } from "stylelint";

export default function formatMessage(warning: Warning, sourcePath?: string): string {
    const properties = [`type=${warning.severity}`];

    if (typeof sourcePath === 'string' && sourcePath.length > 0) {
        properties.push(`sourcePath=${sourcePath}`);
    }

    if (typeof warning.line === 'number') {
        properties.push(`linenumber=${warning.line}`);
    }

    if (typeof warning.column === 'number') {
        properties.push(`columnnumber=${warning.column}`);
    }

    return `##vso[task.logissue ${properties.join(';')}]${warning.text}`;
}
