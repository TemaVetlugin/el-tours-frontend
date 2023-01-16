module.exports = {
    description: 'Create hook',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Hook name(without use)',
        validate: value => !!value
    }],
    actions: [{
        type: 'add',
        path: '../shared/hooks/use{{pascalCase name}}.ts',
        templateFile: 'templates/hook/template.hbs'
    }, {
        type: 'append',
        path: '../shared/hooks/index.ts',
        template: `export { use{{pascalCase name}} } from './use{{pascalCase name}}';`
    }, {
        type: 'sortExports',
        path: '../../shared/hooks/index.ts',
    }]
}
