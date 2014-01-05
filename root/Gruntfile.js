//------------------------------------------------------------------------------
//  Settings
//------------------------------------------------------------------------------
var OUTPUT_JS   = 'app.js';

var TARGET_HTML = 'index.html'; //Gruntfile.js からみた対象HTMLのパス
var SCSS_DIR    = '_src/scss'; //Gruntfile.js からみたSCSSディレクトリ
var CSS_OUTPUT  = 'css';  //Gruntfile.js からみた出力ディレクトリ
var IMAGES_DIR  = 'img';

//------------------------------------------------------------------------------
//  Grunt config
//------------------------------------------------------------------------------
module.exports = function(grunt) {

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

        concat: {
            dist: {
                src: [
                    'js/*.js'
                ],
                dest: "app.js"
            }
        },

        //HTML template using ejs.
        ejs: {
            dev: {
                templateRoot: '_src/ejs',
                template: ['*.ejs'],
                dest: './',
                options: ['_src/options.dev.yaml', {env: 'dev'}]
            }
        },

        watch: {
            css : {
                files : '_src/scss/*.scss',
                tasks : ['compass:dev', 'growl:dev']
            },
            html: {
                files: [
                    '_src/ejs/*.ejs',
                    '_src/ejs/**/*.ejs'
                ],
                tasks: ['ejs:dev', 'growl:dev']
            }
        },

        //Compass compile
        compass: {
            app: {
                options: {
                    noLineComments: true,
                    relativeAssets: true,
                    assetCacheBuster: false,
                    sassDir: SCSS_DIR,
                    cssDir: CSS_OUTPUT,
                    imagesDir: IMAGES_DIR,
                    environment: 'production'
                }
            },
            dev: {
                options: {
                    noLineComments: true,
                    relativeAssets: true,
                    assetCacheBuster: false,
                    sassDir: SCSS_DIR,
                    cssDir: CSS_OUTPUT,
                    imagesDir: IMAGES_DIR
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
                dest: 'app.min.js'
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
                dest: 'app.min.js'
            }
        },
        usemin: {
            html: ["index.html"]
        }
    });

    //Load modules.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-growl');
    grunt.loadNpmTasks('grunt-simple-ejs');

    grunt.registerTask('build', ['ejs:dev', 'usemin', 'compass:app', 'concat', 'uglify:app', 'growl:app']);
    grunt.registerTask('default', ['ejs:dev', 'compass:dev', 'concat', 'uglify:dev', 'growl:app']);
};
