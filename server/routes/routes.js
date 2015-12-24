var Api = require("../api/api.js")

var Routes = [
    {
        method: "GET",
        path: "/hello",
        handler: function (request, reply) {
            reply({"hello":"Welcome to the Service API!"}).code(200);
        }
    },
    {
        path:"/{path*}",
        method: "GET",
        handler: function(request, reply) {
            reply.file("./pages/"+request.params.path);
        }
    },
    {
        path:"/",
        method: "GET",
        handler: function(request, reply) {
            reply.file("./pages/index.html");
        }
    }
];

module.exports = Routes;