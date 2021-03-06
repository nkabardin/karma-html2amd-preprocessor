var util = require('util');

var TEMPLATE = '' +
  'define("%s", [], function() { return \'%s\'; });'

var escapeContent = function(content) {
  return content.replace(/'/g, '\\\'').replace(/\r?\n/g, '\\n\' +\n    \'');
};

var createHtml2AMDPreprocessor = function(logger, config) {
  var prefix = "";

  if (config && config.prefix) {
    prefix = config.prefix;
  }

  var log = logger.create('preprocessor.html2amd');

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);

    var fileNameChunks = file.originalPath.split('/');
    var fileName = prefix + fileNameChunks[fileNameChunks.length - 1];

    log.debug(util.format(TEMPLATE, fileName, escapeContent(content)))

    file.path = file.path + '.js';

    done(util.format(TEMPLATE, fileName, escapeContent(content)));
  };
};

createHtml2AMDPreprocessor.$inject = ['logger', 'config.html2amdPreprocessor'];

module.exports = {
  'preprocessor:html2amd': ['factory', createHtml2AMDPreprocessor]
};
