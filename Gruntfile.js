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
        "maxlen": 100,
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
          dest: 'build/public/<%= pkg.name %>.js'
        }]
      }
    },

    uglify: {
      options: {
        banner: banner
      },
      build: {
        files: {
          'build/public/<%= pkg.name %>.min.js':
            ['build/public/<%= pkg.name %>.js']
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
    /* REVIEW THIS */
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

          // includes files within path and its sub-directories
          {expand: true, src: ['path/**'], dest: 'dest/'},

          // makes all src relative to cwd
          {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

          // flattens results to a single level
          {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
        ]
      }
    },
    /* --- REVIEW THIS */
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
          pretty:true,
          data: {
            debug: false
          }
        },
        files: {
          "build/index.html": "server/views/index.jade",
          "build/partials/navbar-login.html":"public/app/auth/partials/navbar-login.jade",
          "build/partials/signup.html":"public/app/auth/partials/signup.jade",
          "build/partials/chat-index.html":"public/app/chat/partials/chat-index.jade",
          "build/partials/main.html":"public/app/main/partials/main.jade"
        }
      }
    },
    stylus: {
      compile: {
        options: {
          paths: ['public/assets/**/']
        },
        files: {
          'build/assets/styles.css': ['public/assets/**/*.styl'] // compile and concat into single file
        }
      }
    }

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


  grunt.registerTask("cleanAll", 'clean');

  grunt.registerTask("watchMe", 'watch');

  grunt.registerTask("install", 'bower');

  grunt.registerTask("frontTest", 'karma');
  grunt.registerTask("backTest", 'simplemocha');
  grunt.registerTask("testAll",['karma', 'simplemocha']);

  grunt.registerTask("default",['jshint', 'karma', 'simplemocha', 'clean', 'concat', 'uglify']);


  grunt.registerTask("build",['jade','bower']);

}