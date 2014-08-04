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
          dest: 'build/<%= pkg.name %>.js'
        }]
      }
    },

    uglify: {
      options: {
        banner: banner
      },
      build: {
        files: {
          'build/<%= pkg.name %>.min.js':
            ['build/<%= pkg.name %>.js'],
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

    bower: {
      install: {
        options: {
          targetDir: './public/vendor',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: true
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

  grunt.registerTask("cleanAll", 'clean');

  grunt.registerTask("watchMe", 'watch');

  grunt.registerTask("install", 'bower');

  grunt.registerTask("frontTest", 'karma');
  grunt.registerTask("backTest", 'simplemocha');
  grunt.registerTask("testAll",['karma', 'simplemocha']);

  grunt.registerTask("default",['install','jshint', 'karma', 'simplemocha', 'clean', 'concat', 'uglify']);

}