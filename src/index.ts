import { EOL } from 'os';
import { type Formatter } from 'stylelint';

import formatMessage from './formatMessage';

const formatter: Formatter = (results, _): string => {
    if (!Array.isArray(results) || results.length === 0) {
        return '';
    }

    results = results.filter(o => Array.isArray(o.warnings) && o.warnings.length > 0);

    if (results.length === 0) {
        return '';
    }

    const warnings = results.flatMap(result =>
        result.warnings.map(warning => ({
            source: result.source,
            warning
        })));

    const formattedResults = warnings.map(o => formatMessage(o.warning, o.source));

    return formattedResults.join(EOL);
};

export default formatter;
