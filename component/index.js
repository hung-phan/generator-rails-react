'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ComponentGenerator = module.exports = function ComponentGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the component subgenerator with the argument ' + this.name + '.');
};

util.inherits(ComponentGenerator, yeoman.generators.NamedBase);

ComponentGenerator.prototype.askForJSFile = function askForJSFile() {
  var cb = this.async();

  var prompts = [{
    type: 'checkbox',
    name: 'jsFile',
    message: 'What utils would you like to include?',
    choices: [{
      name: 'React Addons',
      value: 'includeReactAddons',
      checked: true
    }]
  }];

  this.prompt(prompts, function(props) {
    function includeJS(js) {
      return props.jsFile.indexOf(js) !== -1;
    }

    // JS
    this.includeReactAddons = includeJS('includeReactAddons');
    cb();
  }.bind(this));
};

ComponentGenerator.prototype.files = function files() {
  this.template('component.js.jsx.coffee', 'app/assets/javascripts/' + this.name + '/' + this.name + '.js.jsx.coffee');
};
