import { EOL } from 'os';
import { Formatter } from 'stylelint';

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
            text: warning.text
        })));

    const formattedResults = warnings.map(warning => 'lorem');

    return formattedResults.join(EOL);
};

export default formatter;
