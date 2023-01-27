import { Formatter } from 'stylelint';

const formatter: Formatter = (results, returnValue): string => {
    if (Array.isArray(results) && results.length === 0) {
        return '';
    }

    return "a string of formatted results";
};

export default formatter;
