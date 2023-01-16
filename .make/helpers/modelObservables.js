module.exports = function (text) {
    if (!text) {
        return '';
    }
    return text.split(',')
        .filter(item => !!item)
        .map(item => `\t\t\t${item.split(':')[0]}: observable`)
        .join(",\n");
}
