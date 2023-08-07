module.exports = {
    description: 'Create model',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Model name',
        validate: value => !!value
    }, {
        type: 'input',
        name: 'properties',
        message: 'Model properties(example: id,name,cityId,latitude:number)',
    }],
    actions: [{
        type: 'add',
        path: '../shared/models/{{pascalCase name}}.model.ts',
        templateFile: 'templates/model/template.hbs'
    }, {
        type: 'append',
        path: '../shared/models/index.ts',
        template: `export { {{pascalCase name}}Model } from './{{pascalCase name}}.model.ts';`
    }, {
        type: 'append',
        path: '../shared/models/index.ts',
        template: `export type { {{pascalCase name}}ModelInterface } from './{{pascalCase name}}.model.ts';`
    }, {
        type: 'sortExports',
        path: '../../shared/models/index.ts',
    }]
}
