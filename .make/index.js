const actions = require("./actions");
const generators = require("./generators");
const helpers = require("./helpers");

module.exports = function (plop) {
    plop.setActionType('sortExports', actions.sortExports);

    plop.setHelper('kebabCase', helpers.kebabCase);
    plop.setHelper('url', helpers.kebabCase);
    plop.setHelper('modelTypes', helpers.modelTypes);
    plop.setHelper('modelProperties', helpers.modelProperties);
    plop.setHelper('modelFillable', helpers.modelFillable);
    plop.setHelper('modelObservables', helpers.modelObservables);

    plop.setGenerator('request', generators.request);
    plop.setGenerator('component', generators.component)
    plop.setGenerator('uikit', generators.uikit)
    plop.setGenerator('page', generators.page)
    plop.setGenerator('model', generators.model)
    plop.setGenerator('hook', generators.hook)
};
