coffee -p -j \
foo.coffee \
rabbit.coffee \
rabbit/client.coffee \
plugins/db.coffee \
plugins/stats.coffee \
plugins/websocket/client.coffee \
plugins/websocket.coffee \
plugins/webserver.coffee \
plugins/log \
socket.coffee >  \
foo.js && node foo.js