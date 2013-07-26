//------------------------------------------------------------------------------
//  Settings
//------------------------------------------------------------------------------
var IMPORT_FILE = 'import.json';
var OUTPUT_JS   = 'app.js';

var TARGET_HTML = 'index.html'; //Gruntfile.js からみた対象HTMLのパス
var SCSS_DIR    = '_src/scss'; //Gruntfile.js からみたSCSSディレクトリ
var CSS_OUTPUT  = 'css';  //Gruntfile.js からみた出力ディレクトリ
var IMG_DIR     = 'img';

//------------------------------------------------------------------------------
//  Grunt config
//------------------------------------------------------------------------------
module.exports = function(grunt) {

    var setting = grunt.file.readJSON(IMPORT_FILE);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Notification
        growl : {
            dev : {
                title : "Grunt compile",
                message : "dev complete"
            },
            app : {
                title : "Grunt compile",
                message : "app complete"
            }
        },

        //HTML template using ejs.
        ejs: {
            dev: {
                template: ['_src/ejs/*.ejs'],
                dest: './',
                options: ['_src/options.dev.yaml', {env: 'dev'}]
            }
        },

        //js compile
        'grunt-unite-js' : {
            dev: {
                config : setting
            },
            app: {
                config : setting
            }
        },

        //Unite Template
        'unite-template': {
            dest: {
                src: './_src/template/*.html',
                target: TARGET_HTML
            }
        },

        watch: {
            css : {
                files : '_src/scss/*.scss',
                tasks : ['compass:dev', 'growl:dev']
            },
            template: {
                files : './_src/template/*.html',
                tasks : ['unite-template', 'growl:dev']
            }
        },

        //Compass compile
        compass: {
            app: {
                options: {
                    sassDir: SCSS_DIR,
                    cssDir: CSS_OUTPUT,
                    environment: 'production'
                }
            },
            dev: {
                options: {
                    sassDir: SCSS_DIR,
                    cssDir: CSS_OUTPUT
                }
            }
        },

        uglify: {
            options: {
                compress: {
                    dead_code: true
                }
            },
            dev: {
                options: {
                    preserveComments: 'some',
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
                    compress: {
                        global_defs: {
                            'DEBUG': true
                        }
                    }
                },
                src : OUTPUT_JS,
                dest: 'app.min.js'//OUTPUT_JS
            },
            app: {
                options: {
                    preserveComments: 'some',
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
                    compress: {
                        global_defs: {
                            'DEBUG': false
                        }
                    }
                },
                src : OUTPUT_JS,
                dest: 'app.min.js'//OUTPUT_JS
            }
        }
    });

    //Load modules.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-unite-js');
    grunt.loadNpmTasks('grunt-growl');
    grunt.loadNpmTasks('grunt-simple-ejs');

    grunt.registerTask('default', ['grunt-unite-js:dev', 'compass:dev', 'uglify:dev', 'growl:dev']);
    grunt.registerTask('js', ['grunt-unite-js:dev', 'growl:dev']);
    grunt.registerTask('build', ['grunt-unite-js:app', 'compass:app', 'uglify:app', 'growl:app']);
};
