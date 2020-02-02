// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['pact', 'jasmine', '@angular-devkit/build-angular'],
    files: ['../node_modules/@pact-foundation/pact-web/pact-web.js'],
    pact: [
        {
          cors: true,
            port: 1234,
            consumer: 'KarmaMochaConsumer',
            provider: 'KarmaMochaProvider',
            logLevel: 'DEBUG',
            dir: './artifacts/pact/',
            log: './artifacts/log/',
        },
    ],
    plugins: [
      require('@pact-foundation/karma-pact'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/pact'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
