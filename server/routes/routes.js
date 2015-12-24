var Routes = [
    {
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) {
            reply({"hello":"Welcome to the Service API!"}).code(200);
        }
    }
];

module.exports = Routes;