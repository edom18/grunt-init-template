/*
 * grunt-init-prj
 *
 * Copyright (c) 2013 Tomoyuki Kashiro kashiro@github
 */

'use strict';

// Basic template description.
exports.description = 'Create a clean proj, with mocha unit test';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ MUST be camelCase or hyphen-connected.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
'install_. After that, you may execute project tasks with _grunt server_, ' +
'_grunt test_ or _grunt build_.';
// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

    init.process({type: 'site'}, [
        // Prompt for these values.
        init.prompt('name'),
        init.prompt('title'),
        init.prompt('description', 'Some descriptions.'),
        init.prompt('version', '0.0.1'),
        init.prompt('licenses', 'MIT'),
        init.prompt('author_name', 'Kazuya Hiruma'),
        init.prompt('author_email', 'edo.m18@gmail.com'),
        init.prompt('author_url', 'http://css-eblog.com/')
    ], function(err, props) {
        // A few additional properties.
        props.appName = props.name.replace(/(\-[a-z])/g,
            function ($1) {
                return $1.toUpperCase().replace('-','');
            });
        props.keywords = [];

        // Files to copy (and process).
        var files = init.filesToCopy(props);

        // Add properly-named license files.
        init.addLicenseFiles(files, props.licenses);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props, {noProcess: '**/lib/**'});

        // Generate package.json file, used by npm and grunt.
        init.writePackageJSON('package.json', {
            name: 'HTML5 based templates.',
            version: '0.0.0-ignored',
            npm_test: 'grunt test',
            node_version: '>= 0.8.0',
            devDependencies: {
                "grunt": "~0.4.0",
                "grunt-contrib-uglify": "~0.2.0",
                "grunt-contrib-jshint": "~0.3.0",
                "grunt-contrib-coffee": "~0.7.0",
                "grunt-contrib-compass": "~0.1.3",
                "grunt-contrib-watch": "~0.3.1",
                "grunt-contrib-clean": "~0.4.1",
                "grunt-contrib-concat": "~0.1.3",
                "grunt-contrib-copy": "~0.4.1"
            },
            engines: {
                'node': '>=0.8.0'
            }
        });

        // All done!
        done();
    });
};
