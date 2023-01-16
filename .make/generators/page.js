module.exports = {
    description: 'Create page',
    prompts: [{
        type: 'input',
        name: 'name',
        message: 'Page name',
        validate: value => !!value
    }],
    actions: [{
        type: 'add',
        path: '../pages/{{kebabCase name}}/index.page.tsx',
        templateFile: 'templates/page/index.tsx.hbs'
    }, {
        type: 'add',
        path: '../pages/{{kebabCase name}}/index.scss',
        templateFile: 'templates/page/index.scss.hbs'
    }]
}
