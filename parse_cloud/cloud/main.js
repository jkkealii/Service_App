require('cloud/app.js');

Parse.Cloud.job("userHoursUpdate", function(request, status) {
    // Set up to modify user data
    Parse.Cloud.useMasterKey();
    var counter = 0;
    // Query for all users
    var query = new Parse.Query(Parse.User);
    query.each(function(user) {
        // Update to plan value passed in
        user.set("plan", request.params.plan);
        if (counter % 100 === 0) {
            // Set the  job's progress status
            status.message(counter + " users processed.");
        }
        counter += 1;
        return user.save();
    }).then(function() {
        // Set the job's success status
        status.success("Migration completed successfully.");
    }, function(error) {
        // Set the job's error status
        status.error("Uh oh, something went wrong.");
    });
});
