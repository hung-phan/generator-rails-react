###* @jsx React.DOM ###
require [
  "jquery"
  "react"
  "home/home"
  "director"<% if (includeSuperagent) { %>
  "superagent"<% } %><% if (includeLodash) { %>
  "lodash"<% } %>
  "bootstrap"
  "jquery_ujs"
], ($, React, home) ->
  "use strict"
  $(document).ready ->

    # App Module
    routeDOMElement = document.getElementById("route")

    #doc for routing https://github.com/flatiron/director
    routes =
      "/": ->
        React.render `<home />`, routeDOMElement
        return

    routerHandler = new Router(routes)
    routerHandler.init "/"
    return

  return
