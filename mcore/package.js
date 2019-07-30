const pkginfo = {
    email: 'miniwe@mail.ru',
    author: 'Miniwe',
    version: '0.6.0',
}

Package.describe({
    name: 'mcore',
    version: pkginfo.version,
    author: pkginfo.author,
    email: pkginfo.email,
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: 'git@bitbucket.org:Miniwe/mcore.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
})

const collections = [
    'files',
    'users',
    'rights',
    'roles',
    'texts',
    'pages',
    'settings',
    'attributes',
    'emails',
]

Package.onUse(function (api) {
    api.versionsFrom('1.8.0.2')

    api.use('ecmascript')
    api.use('aldeed:schema-index')
    api.use('mdg:validated-method')
    api.use('ros:publish-counts')
    api.use('alanning:roles')
    api.use('std:accounts-ui', { weak: true })
    api.use('practicalmeteor:faker')
    api.use('ostrio:files')

    Npm.depends({
        // "classnames": "2.2.6",
        // "date-fns": "1.30.1",
        // "lodash": "4.17.11",
        // "prop-types": "15.6.2",
        // "react-ckeditor-component": "1.1.0",
        // "react-google-maps": "9.4.5",
        // "recompose": "0.30.0",
        // "react-dropzone": "6.2.4",
        // "react-redux": "5.1.1",
        // "react-helmet": "5.2.0",
        // "react-router-config": "4.4.0-beta.6",
        // "react-router-dom": "4.3.1",
        // "react-toastify": "4.5.2",
        // "simpl-schema": "1.5.3",
        // "uniforms-semantic": "1.29.0",
        // "uniforms": "1.29.0",
    })

    collections.forEach(item => {
        api.addFiles(`api/${item}/server/index.js`, ['server'])
        api.addFiles(`api/${item}/services/index.js`, ['server'])
    })

    api.addFiles('api/collection/schemas/list.js', ['client', 'server'])
    api.addFiles('api/collection/schemas/main.js', ['client', 'server'])
    api.addFiles('api/collection/schemas/view.js', ['client', 'server'])
    api.addFiles('api/collection/schemas/index.js', ['client', 'server'])

    api.addFiles('api/collection/server/fixtures.js', ['server'])
    api.addFiles('api/collection/server/methods.js', ['server'])
    api.addFiles('api/collection/server/publications.js', ['server'])

    api.addFiles('api/collection/services/item.js', ['server'])
    api.addFiles('api/collection/services/list.js', ['server'])
    api.addFiles('api/collection/services/validation.js', ['server'])
    api.addFiles('api/collection/services/index.js', ['server'])

    api.addFiles('api/collection/index.js', ['client', 'server'])
    api.addFiles('api/collection/model.js', ['client', 'server'])

    api.addFiles('utils/index.js', ['client', 'server'])
    api.addFiles('utils/constants.js', ['client', 'server'])
    api.addFiles('utils/rate-limit.js', ['client', 'server'])

    api.addFiles('ui/components/index.js', ['client'])

    api.addFiles([
        'assets/fonts/brand-icons.eot',
        'assets/fonts/brand-icons.svg',
        'assets/fonts/brand-icons.ttf',
        'assets/fonts/brand-icons.woff',
        'assets/fonts/brand-icons.woff2',
        'assets/fonts/icons.eot',
        'assets/fonts/icons.svg',
        'assets/fonts/icons.ttf',
        'assets/fonts/icons.woff',
        'assets/fonts/icons.woff2',
        'assets/fonts/outline-icons.eot',
        'assets/fonts/outline-icons.svg',
        'assets/fonts/outline-icons.ttf',
        'assets/fonts/outline-icons.woff',
        'assets/fonts/outline-icons.woff2'
    ], 'client', { isAsset: true });

    api.mainModule('index.js')
})

// Package.onTest(function (api) {
//     api.use('ecmascript')
//     api.use('tinytest')
//     api.use('mcore')
//     api.mainModule('mcore-tests.js')
// })
