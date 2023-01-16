const path = require("path");
const fs = require("fs");

module.exports = function (answers, config, plop) {
    const filename = path.resolve(__dirname, config.path.replace('{{module}}', answers.module));
    let data = fs.readFileSync(filename, 'utf8');
    data = data.split("\n").filter(value => !!value);

    //const onlyTypes = data.every(item => item.includes(' type '));

    data = data.map(row => {
        let origin = row.toString();

        let sort = row.match(/{(.*?)}/)[1].trim();
        if (sort.startsWith('I')) {
            sort = sort.substring(1) + 'aaa';
            origin = origin + "\n";
        }

        return {
            origin,
            sort
        }
    })
        .sort((a, b) => a.sort.localeCompare(b.sort))
        .map(item => item.origin)
        .join("\n");

    fs.writeFileSync(filename, data + "\n", 'utf8');

    return '> ' + filename;
}
