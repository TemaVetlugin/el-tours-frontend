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
        path: '../shared/models/{{pascalCase name}}Model.ts',
        templateFile: 'templates/model/template.hbs'
    }, {
        type: 'append',
        path: '../shared/models/index.ts',
        template: `export { {{pascalCase name}}Model } from './{{pascalCase name}}Model';`
    }, {
        type: 'append',
        path: '../shared/models/index.ts',
        template: `export type { I{{pascalCase name}}Model } from './{{pascalCase name}}Model';`
    }, {
        type: 'sortExports',
        path: '../../shared/models/index.ts',
    }]
}
