

var visionRoutes = [
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
        path: '/favicon.png',
        method: 'GET',
        handler: {
            file: 'favicon.png'
        }
    },
    {
        path: '/',
        method: 'GET',
        handler: function (req, res) {
            res.view('index.html', {

            });
        }
    },
    {
        path: '/events',
        method: 'GET',
        handler: function (req, res) {
            res.view('event_list.html', {

            });
        }
    },
    {
        path: '/events/{event}',
        method: 'GET',
        handler: function (req, res) {
            res.view('event.html', {
                event: req.params.event
            });
        }
    },
    {
        path: '/events/create',
        method: 'GET',
        handler: function (req, res) {
            res.view('new_event.html', {
                
            });
        }
    },
    {
        path: '/members',
        method: 'GET',
        handler: function (req, res) {
            res.view('members.html', {

            });
        }
    },
    {
        path: '/members/create',
        method: 'GET',
        handler: function (req, res) {
            res.view('create_member.html', {

            });
        }
    }
];

module.exports = visionRoutes;
