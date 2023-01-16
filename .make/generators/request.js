module.exports = {
    description: 'Create api request',
    prompts: [{
        type: 'list',
        name: 'module',
        choices: ['api', 'frontend'],
        message: 'Select request module',
    }, {
        type: 'list',
        name: 'type',
        choices: ['get', 'post'],
        message: 'Select request type',
    }, {
        type: 'input',
        name: 'name',
        message: 'Request name',
        validate: value => !!value
    }],
    actions: [{
        type: 'add',
        path: '../shared/requests/{{module}}/{{camelCase name}}Request.ts',
        templateFile: 'templates/request/{{type}}.hbs'
    }, {
        type: 'append',
        path: '../shared/requests/{{module}}/index.ts',
        template: `export { {{camelCase name}}Request } from './{{camelCase name}}Request';`
    }, {
        type: 'sortExports',
        path: '../../shared/requests/{{module}}/index.ts',
    }]
}
