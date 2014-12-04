###* @jsx React.DOM ###
"use strict"

require [
  "jquery"
  "react"
  "home/home"
  "director"<% if (includeSuperagent) { %>
  "superagent"<% } %><% if (includeLodash) { %>
  "lodash"<% } %>
  "bootstrap"
  "jquery_ujs"
], ($, React, Home) ->

  # export React to global env
  window.React = React

	# binding react component
	require ["react_ujs"], (->)

  $(document).ready ->
    # App Module
    routeDOMElement = document.getElementById("route")

    #doc for routing https://github.com/flatiron/director
    routes =
      "/": ->
        React.render `<Home />`, routeDOMElement
        return

    routerHandler = new Router(routes)
    routerHandler.init "/"
    return

  return
