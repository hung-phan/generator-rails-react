# generator-rails-react

> [Yeoman](http://yeoman.io) generator

[![NPM](https://nodei.co/npm/generator-rails-react.png?downloads=true)](https://nodei.co/npm/generator-rails-react/)

## Getting Started

To run this version of yeoman generator. First, make sure that you have already installed yeoman

```bash
$ npm install -g yo
```

To install generator-rails-react from npm, run:

```bash
$ npm install -g generator-rails-react
```

## Usage for Rails 4.*

Firstly, create Ruby on Rails project with normal rails command, but skip it bundle:

```bash
$ rails new app-name --skip-bundle
```

Finally, initiate the generator:

```bash
$ cd app-name
$ yo rails-react
```

Answer 'Yes' to all 'Overwrite' actions. Then config the 'config/database.yml' if you use different
database than sqlite3.

Other dependencies

1. SASS (gem install sass)

2. Compass (gem install compass)

### Update development config
Update `config.assets.digest = false` in `config/environments/development.rb` to enable compilation on the fly so
that any asset file changes are detected by the Rails Server

## Template
I define all the react components with suffix __.js.jsx.coffee__ based on [react-rails](https://github.com/reactjs/react-rails).
For code fragments, I like the way of require.js controlling application by module rather than defining all js file in __application.js__

## Assets compile

Compile your assets before deploying to production server

```bash
$ rake assets:precompile RAILS_ENV=production
```

## Options

Name: mongoid (for mongodb)

add `--skip-active-record` option to your `rails new app --skip-active-record` command before selecting this option.

## Task

### Live reload

For using livereload utility, firstly, install [guard](https://github.com/guard/guard-livereload). Then, use [rack-livereload](https://github.com/johnbintz/rack-livereload)
or install [LiveReload Safari/Chrome extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-)

```bash
$ bundle exec guard # to run the guard server and enjoy coding
```
### Testing
Working on

### Subgenerators

This also supports for subgenerator for `component` as well. Make sure you link them in your
__main.js__

```bash
$ yo rails-react:component "name" #replace the name with your module name

```
## Structure

```
application/
  |- app/
  |  |- assets/
  |  |  |- images/
  |  |  |- javascripts/
  |  |  |  |- <codeModule>/
  |  |  |  |  |- codeModule.js.jsx.coffee
  |  |  |  |- application.js
  |  |  |  |- main.jsx.coffee # main file
  |  |  |- stylesheets/
  |  |  |  |- application.css
  |  |- controllers/
  |  |- helpers/
  |  |- mailers/
  |  |- models/
  |  |- views/
  |  |  |- application/
  |  |  |  |- index.html # default template for the application
  |  |  |- layouts/
  |  |  |  |- application.html.erb
  |- bin/
  |- config/
  |  |- initializers/
  |  |  |- bower_rails.rb # bower rails config
  |  |- requirejs.yml # requirejs config file
  |- db/
  |- lib/
  |- log/
  |- public/
  |- test/
  |- tmp/
  |- vendor/
  |  |- assets/
  |  |  |- bower_components/
  |  |  |  |- third libararies/
  |- |  |- bower.json
  |- Bowerfile # define all bower_components here
  |- config.ru
  |- Gemfile
  |- Gemfile.lock
  |- Guardfile # Guard file for livereload
  |- Rakefile
  |- README.rdoc
```

## Contribution
All contributions are welcomed.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

