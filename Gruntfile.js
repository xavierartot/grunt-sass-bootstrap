'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'assets/bower_components/jquery/dist/jquery.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
    'assets/bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
    'assets/bower_components/modernizr/modernizr.js',
    'assets/js/plugins/*.js',
    'assets/js/plugins.js',
    'assets/js/_*.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/scripts.js',
        '!assets/**/*.min.*'
      ]
    },
    sass: {
      dev: {
        options: {                       // Target options
          lineNumbers: true,
          style: 'compact'
        },
        files: {
          'assets/css/main.css': 'assets/sass/main.scss'
        }
      },
      build: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'assets/css/main.css': 'assets/sass/main.scss'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'assets/js/scripts.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.js': [jsFileList]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'assets/css/'
          }
        },
        src: 'assets/css/main.css'
      },
      build: {
        src: 'assets/css/main.css'
      }
    },
   imagemin: {                          // Task
      dynamic: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 3
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'assets/images/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif,svg}', '**/**/*.{png,jpg,gif,svg}', '*.{png,jpg,gif,svg}'],   // Actual patterns to match
          //ext: '.min.js',   // Dest filepaths will have this extension.
          dest: 'assets/images-min/'                  // Destination path prefix
        }]
      }
    },
    watch: {
      sass: {
        files: [
          'assets/sass/*.scss',
          'assets/sass/**/*.scss'
        ],
        tasks: ['sass:dev', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'concat']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: true
        },
        files: [
          'assets/css/main.css',
          'assets/js/scripts.js',
          '*.*'
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'newer:jshint',
    'newer:sass:dev',
    'newer:autoprefixer:dev',
    'newer:imagemin',
    'newer:concat'
  ]);
  grunt.registerTask('build', [
    'jshint',
    'sass:build',
    'autoprefixer:build',
    'imagemin',
    'uglify'
  ]);
};
