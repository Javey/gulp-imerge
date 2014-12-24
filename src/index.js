/**
 * @fileoverview
 * @author javey
 * @date 14-12-23
 */

var through = require('through2'),
    gutil = require('gulp-util'),
    path = require('path'),
    IMerge = require('imerge');

const PLUGIN_NAME = 'gulp-imerge';

var extend = function(object, properties) {
    for (var i in properties) {
        object[i] = properties[i];
    }
    return object;
};

module.exports = function(options, pathFilter) {
    options = extend({
        spriteTo: '',
        sourceContext: '',
        outputContext: '',
        defaults: {
            padding: null
        },
        options: {
            all: false
        }
    }, options || {});

    var iMerge = new IMerge.IMerge(options, pathFilter),
        iParser = new IMerge.IParser(null, {
            webroot: options.sourceContext,
            defaults: options.defaults,
            options: options.options
        });

    // 保存所有文件，在分析完后，再往下传
    var files = [];

    return through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported'));
            return cb();
        }

        iParser._parse(file.contents.toString(), file.path);

        files.push(file);

        cb();
    }, function(cb) {
        iMerge.sprite(iParser.config)
            .then(
                function(data) {
                    iMerge.kvData(data);
                    files.forEach(function(file) {
                        var iReplace = new IMerge.IReplace(file.path, data, options);
                        file.contents = new Buffer(iReplace.replaceContent(file.contents.toString()));
                        this.push(file)
                    }.bind(this));

                    cb()
                }.bind(this)
            )
            .catch(function(e) {
                console.log(e.stack)
            });
    });
};