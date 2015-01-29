'use strict'

require [
  'jquery'
  'react'
  'home/home'
  'director'<% if (includeSuperagent) { %>
  'superagent'<% } %><% if (includeLodash) { %>
  'lodash'<% } %>
  'bootstrap'
  'jquery_ujs'
], ($, React, Home) ->

  # export React to global env
  window.React = React

  $(document).ready ->
    # binding react component
    require ['react_ujs'], (->)

    # App Module
    routeDOMElement = document.getElementById('route')

    #doc for routing https://github.com/flatiron/director
    routes =
      '/': ->
        React.render React.createFactory(Home)(), routeDOMElement
        return

    routerHandler = new Router(routes)
    routerHandler.init '/'
