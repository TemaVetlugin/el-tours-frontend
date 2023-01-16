const voca = require("voca");

module.exports = function (text) {
    return voca.kebabCase(text).replaceAll('-', '/');
}
