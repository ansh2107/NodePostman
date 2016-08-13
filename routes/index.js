var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
/* GET Userlist page. */
router.get('/userlist',function(req,res){
	var db=req.db;
	var collection = db.get('usercollection');
	collection.find({}).toArray(function(e,docs){
   // res.render('userlist', {
     //   "userlist" : docs
   // });
    res.json(docs);
});

});
/*
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    assert.equal(2, docs.length);
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });
}
*/


/* POST to Add User Service */
router.post('/adduser',function(req,res){

    // Set our internal DB variable
    var db=req.db;

    // Get our form values. These rely on the "name" attributes
    var firstName=req.body.firstname;
    var lastName=req.body.lastname;
    var userMobile=req.body.mobile;
    // Set our collection
    var collection=db.get('usercollection');

    // Submit to the DB
    collection.insert([
        {firstname:firstName},
        {lastname:lastName},{mobile:userMobile}],function(err,doc){
                    if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
          //  res.redirect("userlist");
          res.json({ message: 'Successfully deleted' });
        }
    });

});



/* GET to search Specific User Service */
router.get('/searchuser/:mobile',function(req,res){

    // Set our internal DB variable
    var db=req.db;
    var userMobile=req.params.mobile;
  //  res.json(id);
    // Get our form values. These rely on the "name" attributes
  //  var userMobile=req.body.mobile;
    // Set our collection
    var collection=db.get('usercollection');

    // Submit to the DB
    collection.find({"mobile":userMobile},function(err,docs){
    if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page

           res.json(docs);
        }
    });
});

/* GET to deleete Specific User Service */
router.get('/deleteuser/:mobile',function(req,res){

    // Set our internal DB variable
    var db=req.db;
    var userMobile=req.params.mobile;
  //  res.json(id);
    // Get our form values. These rely on the "name" attributes
  //  var userMobile=req.body.mobile;
    // Set our collection
    var collection=db.get('usercollection');

    // Submit to the DB
    collection.remove({"mobile":userMobile},function(err,docs){
    if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
           res.json({ message: 'Successfully deleted' });
        }
    });
});

module.exports = router;


/* POST to Add User Service */
router.post('/callpost/:mobile',function(req,res){

    // Set our internal DB variable
    var db=req.db;
    var userMobile=req.params.mobile;
  //  res.json=(userMobile);
    var phoneNumber=req.body.fromphonenumber;
    var callType=req.body.calltype;
    var callDate=req.body.calldate;
    var callDuration=req.body.callduration;
    // Set our collection
    var collection=db.get('calldetails');
   // var calldetails=db.get('usercollection');
    // Submit to the DB
    collection.insert({
        "tophonenumber":userMobile,"fromphonenumber":phoneNumber,
        "calltype":callType,"calldate":callDate,"callduration":callDuration
        },function(err,doc){
                    if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
             res.json({ message: 'Successfully added' });
        }
    });

});



/* GET Userlist page. */
router.get('/callget',function(req,res){
    var db=req.db;
    var collection = db.get('calldetails');
    collection.find({},{},function(e,docs){
   // res.render('userlist', {
     //   "userlist" : docs
   // });
    res.json(docs);
});

});


router.get('/searchcalldetails/:tophonenumber',function(req,res){

    // Set our internal DB variable
    var db=req.db;
    var userMobile=req.params.tophonenumber;
  //  res.json(id);
    // Get our form values. These rely on the "name" attributes
  //  var userMobile=req.body.mobile;
    // Set our collection
    var collection=db.get('calldetails');

    // Submit to the DB
    collection.find({"tophonenumber":userMobile},function(err,docs){
    if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page

           res.json(docs);
        }
    });
});


router.get('/deletecalldetails/:tophonenumber',function(req,res){

    // Set our internal DB variable
    var db=req.db;
    var userMobile=req.params.tophonenumber;
  //  res.json(id);
    // Get our form values. These rely on the "name" attributes
  //  var userMobile=req.body.mobile;
    // Set our collection
    var collection=db.get('calldetails');

    // Submit to the DB
    collection.remove({"tophonenumber":userMobile},function(err,docs){
    if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
           res.json({ message: 'Successfully deleted' });
        }
    });
});

module.exports = router;