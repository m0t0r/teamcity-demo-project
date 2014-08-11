module.exports = function(grunt){

  var banner = '/*\n<%= pkg.name %> <%= pkg.version %>\n' +
      '<%= pkg.description %>\n' +
      'Built on <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner:banner,

    jshint:{
      options:{
        "bitwise": true,
        "immed": true,
        "newcap": true,
        "noarg": true,
        "noempty": true,
        "nonew": true,
        "trailing": true,
        "maxlen": 200,
        "boss": true,
        "eqnull": true,
        "expr": true,
        "globalstrict": true,
        "laxbreak": true,
        "loopfunc": true,
        "sub": true,
        "undef": true,
        "browser": true,
        globals: {
          "console": true,
          toastr:true,
          angular: true,
          $: true
        }
      },
      target:{
        src:"public/app/**/*.js"
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: true
      }
    },

    simplemocha: {
      options: {
        globals: ['expect'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      },
      all: { src: ['test/mocha/**/*.js'] }
    },

    concat: {
      options: {
        separator: ';\n',
        banner: banner
      },
      build: {
        files: [{
          src: ['public/app/**/*.js'],
          dest: 'build/public/app/<%= pkg.name %>.js'
        }]
      }
    },

    uglify: {
      options: {
        banner: banner
      },
      build: {
        files: {
          'build/public/app/<%= pkg.name %>.min.js':
            ['build/public/app/<%= pkg.name %>.js']
        }
      }
    },

    clean: {
      build: {
        src: ["build"]
      }
    },

    watch: {
      src: {
        files: ['public/app/**/*.js', 'server/**/*.js', 'server.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['server.js'], dest: 'build/', filter: 'isFile'},
          {expand: true, src: ['protractor-conf.js'], dest: 'build/', filter: 'isFile'},
          {expand: true, src: ['Gruntfile.js'], dest: 'build/', filter: 'isFile'},
          {expand: true, src: ['package.json'], dest: 'build/', filter: 'isFile'},
          // includes files within path and its sub-directories
          {expand: true, src: ['server/**'], dest: 'build/'},
          {expand: true, src: ['test/e2e/**'], dest: 'build/'}
        ]
      }
    },

    bower: {
      install: {
        options: {
          targetDir: './build/public/vendor',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: true
        }
      }
    },

    jade: {
      compile: {
        options: {
          //pretty:true,
          data: {
            debug: false
          }
        },
        files: {
          "build/public/partials/auth/navbar-login.html":"public/app/auth/partials/navbar-login.jade",
          "build/public/partials/auth/signup.html":"public/app/auth/partials/signup.jade",
          "build/public/partials/chat/chat-index.html":"public/app/chat/partials/chat-index.jade",
          "build/public/partials/main/main.html":"public/app/main/partials/main.jade"
        }
      }
    },

    stylus: {
      compile: {
        options: {
          paths: ['public/assets/**/']
        },
        files: {
          'build/public/assets/styles.css': ['public/assets/**/*.styl'] // compile and concat into single file
        }
      }
    },

    nodemon: {
      dev: {
        script: 'build/server.js'
      }
    },

    // E2E specific tasks
    protractor: {
      options: {
        configFile: 'protractor-conf.js', // Default config file
        keepAlive: false, // If false, the grunt process stops when the test fails.
        noColor: false // If true, protractor will not use colors in its output.
      },
      chrome: {
        options: {
          configFile: 'protractor-conf.js', // Default config file
          args: {
            browser:'chrome'
          }
        }
      },
      firefox: {
        options: {
          configFile: 'protractor-conf.js', // Default config file
          args: {
            browser:'firefox'
          }
        }
      }
    },

    express: {
      options: {
        port: 8080
      },
      test: {
        options: {
          script: 'build/server.js',
          node_env: 'test'
        }
      }
    }
    // E2E specific tasks

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-express-server');


  grunt.registerTask("cleanAll", 'clean');

  grunt.registerTask("watchMe", 'watch');

  grunt.registerTask("frontTest", 'karma');
  grunt.registerTask("backTest", 'simplemocha');
  grunt.registerTask("testAll",['karma', 'simplemocha']);
  grunt.registerTask('e2e-chrome', ['express:test', 'protractor:chrome']);
  grunt.registerTask('e2e-firefox', ['express:test', 'protractor:firefox']);

  grunt.registerTask("build",['jshint', 'karma', 'simplemocha', 'clean', 'bower', 'jade', 'stylus','concat', 'uglify', 'copy']);

  grunt.registerTask("default",['build', 'nodemon']);

}