###* @jsx React.DOM ###
define [<% if (includeReactAddons) { %>
  "react-with-addons"<% } else { %>
  "react"<% } %>
], (React) ->
  <%= name %> = React.createClass(
    getInitialState: ->
      text: "Template for <%= name %>"

    clickMeUpdate: (e) ->
      @setState text: @state.text.split("").reverse().join("")
      return

    render: ->
      `<h1 onClick={this.clickMeUpdate}>{this.state.text}</h1>`
  )
  <%= name %>
