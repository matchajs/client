module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        transport: {
            options: {
                idleading: '<%= pkg.organization %>/<%= pkg.name %>/<%= pkg.version %>/'  //生成的id的格式
            },
            client: {
                files: [{
                    cwd: 'src',
                    src: 'client.js',
                    dest: '~build'
                }]
            }

        },

        concat: {
            main: {
                options: {
                    relative: true
                },
                files: {
                    'dist/<%= pkg.version %>/client.js': ['~build/client.js'],
                    'dist/<%= pkg.version %>/client-debug.js': ['~build/client-debug.js']
                }
            }
        },

        uglify: {
            options: {
                beautify: {
                    ascii_only: true
                },
                sourceMap: 'dist/<%= pkg.version %>/client.js.map'
            },
            client: {
                files: {
                    'dist/<%= pkg.version %>/client.js': ['dist/<%= pkg.version %>/client.js']
                }
            }
        },

        clean: {
            build: ['~build'] //清除.build文件
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['transport', 'concat', 'uglify', 'clean']);
};