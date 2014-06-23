'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var magenta = chalk.magenta;
var shell = require('shelljs');

var RailsReactGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.on('end', function () {
      if (!this.options['skip-install']) {
        console.log(magenta("Thank for using"));
      }
    });
  },

  askForCSSLibrary: function () {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'cssFile',
      message: 'What css library would you like to include?',
      choices: [
        { name: 'SASS Button by Alexwolfe' , value: 'includeButtonCss'   , checked: false },
        { name: 'Animate SCSS'             , value: 'includeAnimateCss'  , checked: false },
        { name: 'Bootstrap font-awesome'   , value: 'includeFontAwesome' , checked: true }
      ]
    }];

    this.prompt(prompts, function (props) {
      function includeCSS(css) { return props.cssFile.indexOf(css) !== -1; }

      // CSS
      this.includeButtonCss   = includeCSS('includeButtonCss');
      this.includeAnimateCss  = includeCSS('includeAnimateCss');
      this.includeFontAwesome = includeCSS('includeFontAwesome');

      cb();
    }.bind(this));
  },

  assForUtility: function() {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'tool',
      message: 'What tool support would you like to include?',
      choices: [
        { name: 'Livereload' , value: 'includeLiveReload' , checked: false }
      ]
    }];

    this.prompt(prompts, function (props) {
      function includeTool(tool) { return props.tool.indexOf(tool) !== -1; }

      // template support
      this.includeLiveReload = includeTool('includeLiveReload');

      cb();
    }.bind(this));
  },

  assForJSFile: function() {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'jsFile',
      message: 'What js library would you like to include?',
      choices: [
        { name: 'Lodash.js'                , value: 'includeLodash'      , checked: true } ,
        { name: 'REST wrapper by jpillora' , value: 'includeRest'        , checked: true } ,
        { name: 'React Addons'             , value: 'includeReactAddons' , checked: true } ,
        { name: 'Modernizr'                , value: 'includeModernizr'   , checked: true }
      ]
    }];

    this.prompt(prompts, function (props) {
      function includeJS(js) { return props.jsFile.indexOf(js) !== -1; }

      // JS
      this.includeLodash      = includeJS('includeLodash');
      this.includeReactAddons = includeJS('includeReactAddons');
      this.includeRest        = includeJS('includeRest');
      this.includeModernizr   = includeJS('includeModernizr');
      cb();
    }.bind(this));
  },

  processingGemfileTemplate: function() {
    console.log(magenta('Processing Gemfile'));
    this.template('Gemfile', 'tmp/yeoman/Gemfile');
  },

  gemfile: function() {
    //process Gemfile
    var path   = 'tmp/yeoman/Gemfile',
        dest   = 'Gemfile',
        file   = this.readFileAsString(dest),
        insert = this.readFileAsString(path);

    //modify file before insert
    file = file.replace("# Use jquery as the JavaScript library\n", '')
               .replace("gem 'jquery-rails'\n", '')
               .replace("# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks\n", '')
               .replace("gem 'turbolinks'\n", '');

    if (file.indexOf(insert) === -1) {
      this.write(dest, file + insert);
    }
  },

  bundleInstall: function() {
    shell.exec("bundle install");
  },

  executeBowerTask: function() {
    console.log(magenta('Processing Bowerfile'));
    shell.exec("rails g bower_rails:initialize");
  },

  processingBowerfileTemplate: function() {
    this.template('Bowerfile', 'tmp/yeoman/Bowerfile');
  },

  bower: function() {
    //process bower
    var path   = 'tmp/yeoman/Bowerfile',
        dest   = 'Bowerfile',
        file   = this.readFileAsString(dest),
        insert = this.readFileAsString(path);

    if (file.indexOf(insert) === -1) {
      this.write(dest, file + insert);
    }
  },

  bowerInstall: function() {
    shell.exec("rake bower:install");
  },

  requirejs: function() {
    //requirejs config
    console.log(magenta('Requirejs config/requirejs.yml'));
    this.template('config/requirejs.yml', 'config/requirejs.yml');
  },


  guard: function() {
    //process livereload
    console.log(magenta('Add livereload utility'));
    if (this.includeLiveReload) {
      shell.exec("guard init livereload");
    }
  },

  view: function () {
    console.log(magenta('Processing view'));
    this.copy('view/index.html', 'app/views/application/index.html');
    this.template('view/application.html.erb', 'app/views/layouts/application.html.erb');
  },

  appJs: function() {
    console.log(magenta('Processing app js'));
    var path   = 'app/assets/javascripts/application.js',
        file   = this.readFileAsString(path);

    //modify file before insert
    file = file.replace("//= require jquery\n", '')
               .replace("//= require jquery_ujs\n", '')
               .replace("//= require turbolinks\n", '')
               .replace("//= require_tree .", '//= require main');

    this.write(path, file);
    this.template('app/main.jsx.coffee', 'app/assets/javascripts/main.jsx.coffee');
    this.template('app/home/home.js.jsx.coffee', 'app/assets/javascripts/home/home.js.jsx.coffee');
  },

  routes: function() {
    console.log(magenta('Processing config/routes.rb'));
    var path   = 'config/routes.rb',
        hook   = 'Rails.application.routes.draw do\n',
        file   = this.readFileAsString(path),
        insert = "  root 'application#index'\n";

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, hook + insert));
    }
  },

  stylesheets: function() {
    console.log(magenta('Processing app stylesheets'));
    var extra  = '';
    if (this.includeButtonCss) {
      extra += " *= require Buttons/scss/buttons.scss\n";
    }
    if (this.includeAnimateCss) {
      extra += " *= require animate-sass/_animate.scss\n";
    }
    var path   = 'app/assets/stylesheets/application.css',
        hook   = ' *= require_tree .\n',
        file   = this.readFileAsString(path),
        insert = ' *= require sass-bootstrap/lib/bootstrap.scss\n' +
                 ' *= require font-awesome\n' +
                 extra +
                 ' *= require_tree .\n';

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert));
    }
  }

});

module.exports = RailsReactGenerator;
