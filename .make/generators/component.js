module.exports = {
    description: 'Create component',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Component name',
        validate: value => !!value
    }],
    actions: [{
        type: 'add',
        path: '../shared/components/C{{pascalCase name}}/index.tsx',
        templateFile: 'templates/component/index.tsx.hbs'
    }, {
        type: 'add',
        path: '../shared/components/C{{pascalCase name}}/index.scss',
        templateFile: 'templates/component/index.scss.hbs'
    }, {
        type: 'append',
        path: '../shared/components/index.ts',
        template: `export { C{{pascalCase name}} } from './C{{pascalCase name}}';`
    }, {
        type: 'sortExports',
        path: '../../shared/components/index.ts',
    }]
}
