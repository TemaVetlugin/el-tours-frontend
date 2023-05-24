import groupBy from 'lodash/groupBy';
import keyBy from 'lodash/keyBy';
import snakeCase from 'lodash/snakeCase';
import camelCase from 'lodash/camelCase';
import kebabCase from 'lodash/kebabCase';
import uniq from 'lodash/uniq';
import minBy from 'lodash/minBy';

//fix for minify script size
export const lodash = {
    groupBy,
    keyBy,
    minBy,
    snakeCase,
    camelCase,
    kebabCase,
    uniq
}
