require('cloud/app.js');

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
// Parse.Cloud.define("hello", function(request, response) {
//     response.success("Hello world!");
// });

Parse.Cloud.beforeSave("Event", function(request, response) {
    console.log("beforeSave triggered");
    console.log(request.user);
    if (request.user) {
        var query = new Parse.Query(Parse.Role);
        query.equalTo("name", "Administrator");
        query.equalTo("users", request.user);
        query.first().then(function(adminRole) {
            response.success();
        }, function(error) {
            response.error("You are not an Administrator");
        });
    } else {
        response.error("You must be logged in to save Events");
    }
});
