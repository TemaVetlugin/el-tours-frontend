import { defineConfig } from 'cypress'

const codeCoverageTask = require("@cypress/code-coverage/task")

export default defineConfig({
    component: {
        specPattern: 'shared/uikit/**/test.{js,jsx,ts,tsx}',
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
        setupNodeEvents(on, config) {
            codeCoverageTask(on, config);
            return config;
        },
    },
})
