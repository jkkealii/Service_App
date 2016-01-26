require('cloud/app.js');


// get all users, make an object with the ids as keys for quick access
// get all events and their drivers and memebers
// add hours to users
Parse.Cloud.job("userHoursUpdate", function(request, status) {
    Parse.Cloud.useMasterKey();
    var counter = 0;
    var usersObj = {};

    var query = new Parse.Query(Parse.User);
    query.find().then(function(listUsers) {

    });

    // query.each(function(user) {
    //     // Update to plan value passed in
    //     user.set("plan", request.params.plan);
    //     if (counter % 100 === 0) {
    //         // Set the  job's progress status
    //         status.message(counter + " users processed.");
    //     }
    //     counter += 1;
    //     return user.save();
    // }).then(function() {
    //     // Set the job's success status
    //     status.success("Migration completed successfully.");
    // }, function(error) {
    //     // Set the job's error status
    //     status.error("Uh oh, something went wrong.");
    // });
});
