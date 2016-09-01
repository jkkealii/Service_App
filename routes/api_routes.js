var apiRoutes = [
    {
        method: 'GET',
        path: '/hello',
        handler: function (req, res) {
            res({
                'hello': 'Welcome to the Service App!'
            }).code(200);
        }
    }
];

module.exports = apiRoutes;
