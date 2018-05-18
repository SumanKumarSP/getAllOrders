var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://suman:suman@ds149069.mlab.com:49069/heroku_2v45zr2n';


/** getAllRoutes controller logic that current does model logic too -connects to Mongo database and
 * queries the Routes collection to retrieve all the routes and build the output usig the
 * ejs template mongodb.ejs found in views directory
 * @param request
 * @param response
 *
 */
module.exports = getAllOrder;

//**************************************************************************
//***** mongodb get all of the Orders in Orders collection where frequence>=1
//      and sort by the name of the route.  Render information in the views/pages/mongodb.ejs
getAllOrder.get('/getAllOrders', function (request, response) {
mongodb.MongoClient.connect('mongodb://suman:suman@ds149069.mlab.com:49069/heroku_2v45zr2n', function(err, client) {
    if(err) throw err;
    //get collection of Orders
    var db = client.db('heroku_2v45zr2n');  // in v3 we need to get the db from the client
    var Orders = db.collection('Orders');
    //get all Orders with frequency >=1
    Orders.find({ frequency : { $gte: 0 } }).sort({ name: 1 }).toArray(function (err, docs) {
        if(err) throw err;

        response.render('getAllOrders', {results: docs});

    });

    //close connection when your app is terminating.
    // db.close(function (err) {
    client.close(function (err) {
        if(err) throw err;
    });
});//end of connect
});//end app.get
