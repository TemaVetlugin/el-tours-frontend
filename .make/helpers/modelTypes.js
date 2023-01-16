module.exports = function (text) {
    const getType = (name = 'id', type = undefined) => {
        if (type) {
            return type;
        }
        if (name === 'id' || name.includes('Id')) {
            return 'number';
        }

        return 'string';
    }
    if (!text) {
        return '';
    }
    return text.split(',')
        .filter(item => !!item)
        .map(item => {
            const data = item.split(':');
            const name = data[0];
            const type = getType(name, data[1] || undefined);
            return `\t${name}?: ${type};`;
        })
        .join("\n");
}
