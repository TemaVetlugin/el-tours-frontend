module.exports = {
    description: 'Create uikit component',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Component name(without Ui)',
        validate: value => !!value
    }],
    actions: [{
        type: 'add',
        path: '../shared/uikit/Ui{{pascalCase name}}/index.tsx',
        templateFile: 'templates/uikit/index.tsx.hbs'
    }, {
        type: 'add',
        path: '../shared/uikit/Ui{{pascalCase name}}/index.scss',
        templateFile: 'templates/uikit/index.scss.hbs'
    }, {
        type: 'append',
        path: '../shared/uikit/index.ts',
        template: `export { Ui{{pascalCase name}} } from './Ui{{pascalCase name}}';`
    }, {
        type: 'sortExports',
        path: '../../shared/uikit/index.ts',
    }]
}
