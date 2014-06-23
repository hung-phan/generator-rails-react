###* @jsx React.DOM ###
require [
  "jquery"<% if (includeReactAddons) { %>
  "react-with-addons"<% } else { %>
  "react"<% } %>
  "home/home"
  "director"<% if (includeRest) { %>
  "rest"<% } %><% if (includeLodash) { %>
  "lodash"<% } %>
  "bootstrap"
], ($, React, home) ->
  "use strict"
  $(document).ready ->

    # App Module
    routeDOMElement = document.getElementById("route")

    #doc for routing https://github.com/flatiron/director
    routes =
      "/": ->
        React.renderComponent `<home />`, routeDOMElement
        return

    routerHandler = new Router(routes)
    routerHandler.init "/"
    return

  return
