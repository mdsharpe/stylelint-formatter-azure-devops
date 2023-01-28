import { EOL } from 'os';
import { type Formatter } from 'stylelint';
import formatMessage from './formatMessage';

const formatter: Formatter = (results, _): string => {
    if (!Array.isArray(results)) {
        return '';
    }

    results = results.filter(result => Array.isArray(result.warnings) && result.warnings.length > 0);

    if (results.length === 0) {
        return '';
    }

    const warnings = results.flatMap(result =>
        result.warnings.map(warning => ({
            source: result.source,
            warning
        })));

    const formattedResults = warnings.map(warning => formatMessage(warning.warning, warning.source));

    return formattedResults.join(EOL);
};

export default formatter;
