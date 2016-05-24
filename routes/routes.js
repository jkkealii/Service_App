

var routes = [
    {
        method: 'GET',
        path: '/hello',
        handler: function (req, res) {
            res({
                'hello': 'Welcome to the Service App!'
            }).code(200);
        }
    },
    {
        path: '/static/{path*}',
        method: 'GET',
        handler: {
            file: function (req) {
                return req.params.path;
            }
        }
            // directory: {
            //     path: './static',
            //     listing: false,
            //     index: false
            // }
    },
    {
        path: '/',
        method: 'GET',
        handler: function (req, res) {
            res.view('index.html', {

            });
        }
    }
];

module.exports = routes;
