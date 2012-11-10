class plugin_hallo
  constructor:(@rabbit)->
    rabbit.emit "connection"
